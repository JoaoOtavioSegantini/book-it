import { NextApiRequest, NextApiResponse } from 'next'
import Room from '@models/room'
import Booking from '@models/booking'
import catchAsync from '@middlewares/catchAsync'
import ErrorHandler from '@utils/errorHandler'
import ApiFeatures from '@utils/apiFeatures'
import { ReqBody } from './paymentController'
import { Review } from 'types/review'

export const allRooms = catchAsync(
  async (req: NextApiRequest, res: NextApiResponse) => {
    const resPerPage = 4
    const roomCount = await Room.countDocuments()

    const apiFeatures = new ApiFeatures(Room.find(), req.query)
      .search()
      .filter()

    apiFeatures.pagination(resPerPage)
    const rooms = await apiFeatures.query
    const filteredRoomsCount = rooms.length

    res.status(200).json({
      success: true,
      roomCount,
      resPerPage,
      filteredRoomsCount,
      rooms
    })
  }
)

export const newRoom = catchAsync(
  async (req: NextApiRequest, res: NextApiResponse) => {
    const room = await Room.create(req.body)

    res.status(200).json({
      success: true,
      room
    })
  }
)

export const getSingleRoom = catchAsync(
  async (
    req: NextApiRequest,
    res: NextApiResponse,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    next: any
  ) => {
    const room = await Room.findById(req.query.id)
    if (!room) {
      return next(new ErrorHandler('Room not found with this ID', 404))
    }
    res.status(200).json({
      success: true,
      room
    })
  }
)

export const updateRoom = catchAsync(
  async (req: NextApiRequest, res: NextApiResponse) => {
    let room = await Room.findById(req.query.id)
    if (!room) {
      res.status(404).json({
        success: false,
        error: 'room not found with this id'
      })
    }
    room = await Room.findByIdAndUpdate(req.query.id, req.body, {
      runValidators: true,
      new: true
    })
    res.status(200).json({
      success: true,
      room
    })
  }
)

// Create a new review   =>   /api/reviews
export const createRoomReview = catchAsync(
  async (req: NextApiRequest & ReqBody, res: NextApiResponse) => {
    const { rating, comment, roomId } = req.body

    const review = {
      user: req.user._id,
      name: req.user.name,
      rating: Number(rating),
      comment
    }

    const room = await Room.findById(roomId)

    const isReviewed = room.reviews.find(
      (r: Review) => r.user.toString() === req.user!._id!.toString()
    )
    if (isReviewed) {
      room.reviews.forEach((review: Review) => {
        if (review.user.toString() === req.user!._id!.toString()) {
          review.comment = comment
          review.rating = rating
        }
      })
    } else {
      room.reviews.push(review)
      room.numOfReviews = room.reviews.length
    }

    room.ratings =
      room.reviews.reduce((acc: number, item: Review) => item.rating + acc, 0) /
      room.reviews.length

    await room.save({ validateBeforeSave: false })

    res.status(200).json({
      success: true
    })
  }
)

// Check Review Availability   =>   /api/reviews/check_review_availability
export const checkReviewAvailability = catchAsync(
  async (req: NextApiRequest & ReqBody, res: NextApiResponse) => {
    const { roomId } = req.query

    const bookings = await Booking.find({ user: req.user._id, room: roomId })

    let isReviewAvailable = false
    if (bookings.length > 0) isReviewAvailable = true

    res.status(200).json({
      success: true,
      isReviewAvailable
    })
  }
)

export const deleteRoom = catchAsync(
  async (req: NextApiRequest, res: NextApiResponse) => {
    const room = await Room.findById(req.query.id)

    if (!room) {
      res.status(404).json({
        success: false,
        error: 'room not found with this id'
      })
    }

    await room.remove()
    res.status(200).json({
      success: true,
      message: 'room is deleted'
    })
  }
)
