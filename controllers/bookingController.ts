import catchAsync from '@middlewares/catchAsync'
import Booking from '@models/booking'
import { NextApiRequest, NextApiResponse } from 'next/types'
import { Availability, Booking as BookingTypes } from 'types/booking'
import { User } from 'types/user'
import Moment from 'moment'
import { extendMoment } from 'moment-range'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const moment = extendMoment(Moment as any)

type ReqBody = {
  user: User
}
export const newBooking = catchAsync(
  async (req: NextApiRequest & ReqBody, res: NextApiResponse) => {
    const {
      room,
      checkInDate,
      checkOutDate,
      daysOfStay,
      amountPaid,
      paymentInfo
    } = req.body as BookingTypes

    const booking = await Booking.create({
      room,
      user: req.user._id,
      checkInDate,
      checkOutDate,
      daysOfStay,
      amountPaid,
      paymentInfo,
      paidAt: Date.now()
    })

    res.status(200).json({
      success: true,
      booking
    })
  }
)

export const checkRoomBookingAvailability = catchAsync(
  async (req: NextApiRequest, res: NextApiResponse) => {
    // eslint-disable-next-line prefer-const
    let { roomId, checkInDate, checkOutDate } =
      req.query as unknown as Availability

    checkInDate = new Date(checkInDate!)
    checkOutDate = new Date(checkOutDate!)

    const bookings = await Booking.find({
      room: roomId,
      $and: [
        {
          checkInDate: {
            $lte: checkOutDate
          }
        },
        {
          checkOutDate: {
            $gte: checkInDate
          }
        }
      ]
    })

    // Check if there is any booking available
    let isAvailable: boolean

    if (bookings && bookings.length === 0) {
      isAvailable = true
    } else {
      isAvailable = false
    }

    res.status(200).json({
      success: true,
      isAvailable
    })
  }
)

export const checkBookedDatesOfRoom = catchAsync(
  async (req: NextApiRequest, res: NextApiResponse) => {
    const { roomId } = req.query

    const bookings = await Booking.find({ room: roomId })
    let bookedDates: Moment.Moment[] = []
    const timeDiffernece = moment().utcOffset() / 60

    bookings.forEach((booking) => {
      const checkInDate = moment(booking.checkInDate).add(
        timeDiffernece,
        'hours'
      )
      const checkOutDate = moment(booking.checkOutDate).add(
        timeDiffernece,
        'hours'
      )
      const range = moment.range(moment(checkInDate), moment(checkOutDate))
      const dates = Array.from(range.by('day'))
      bookedDates = bookedDates.concat(dates)
    })

    res.status(200).json({
      success: true,
      bookedDates
    })
  }
)

// Get all bookings of current user   =>   /api/bookings/me
export const myBookings = catchAsync(
  async (req: NextApiRequest & ReqBody, res: NextApiResponse) => {
    const bookings = await Booking.find({ user: req.user._id })
      .populate({
        path: 'room',
        select: 'name price images'
      })
      .populate({
        path: 'user',
        select: 'name email'
      })

    res.status(200).json({
      success: true,
      bookings
    })
  }
)

// Get booking details   =>   /api/bookings/:id
export const getBookingDetails = catchAsync(
  async (req: NextApiRequest, res: NextApiResponse) => {
    const booking = await Booking.findById(req.query.id)
      .populate({
        path: 'room',
        select: 'name price images'
      })
      .populate({
        path: 'user',
        select: 'name email'
      })

    res.status(200).json({
      success: true,
      booking
    })
  }
)
