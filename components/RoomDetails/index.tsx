import { Room } from 'types/room'
import Head from 'next/head'
import Image from 'next/image'
import { useDispatch, useSelector } from 'react-redux'
import { Carousel } from 'react-bootstrap'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { clearErrors } from 'store/actions/roomActions'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

import { Features, ListReviews, NewReview } from '@components'
import { UserState } from '@components/Layout/Header'
//import router from 'next/router'
import axios from 'axios'
import { checkBooking, getBookedDates } from 'store/actions/bookingAction'
import { ErrorResponse } from 'types/error'
import { CHECK_BOOKING_RESET } from 'store/constants/bookingContants'

type Props = {
  roomDetails: {
    room: Room
    error: Error
  }
}

type CheckBookingState = {
  checkingBook: {
    available: boolean
    error: Error
    loading: boolean
  }
}

type CheckBookedState = {
  bookedDates: {
    dates: [Date]
    error: Error
    loading: boolean
  }
}

type PropsBase = {
  id: string
}

const RoomDetails = ({ id }: PropsBase) => {
  const [checkInDate, setCheckInDate] = useState()
  const [checkOutDate, setCheckOutDate] = useState()
  const [daysOfStay, setDaysOfStay] = useState<number>()

  const { user } = useSelector((state: UserState) => state.currentUser)
  const { room, error } = useSelector((state) => (state as Props).roomDetails)
  const { dates } = useSelector((state: CheckBookedState) => state.bookedDates)

  const { available, loading: bookingLoading } = useSelector(
    (state: CheckBookingState) => state.checkingBook
  )

  const excludedDates: Date[] | undefined = []
  dates.forEach((date: string | number | Date) => {
    excludedDates.push(new Date(date))
  })

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getBookedDates(id))

    toast.error(error)
    dispatch(clearErrors())

    return () => {
      dispatch({ type: CHECK_BOOKING_RESET })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, id])
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onChange = (dates: any) => {
    const [checkInDate, checkOutDate] = dates
    setCheckInDate(checkInDate)
    setCheckOutDate(checkOutDate)

    if (checkInDate && checkOutDate) {
      const days = Math.floor(
        (Number(new Date(checkOutDate)) - Number(new Date(checkInDate))) /
          86400000 +
          1
      )

      setDaysOfStay(days)

      const availableData = {
        roomId: id,
        checkInDate,
        checkOutDate
      }

      dispatch(checkBooking(availableData))
    }
  }

  useEffect(() => {
    toast.error(error)
    dispatch(clearErrors())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const newBookingHandler = async () => {
    const bookingData = {
      room: id, //router.query.id,
      checkInDate,
      checkOutDate,
      daysOfStay,
      amountPaid: 90,
      paymentInfo: {
        id: 'STRIPE_PAYMENT_ID',
        status: 'STRIPE_PAYMENT_STATUS'
      }
    }

    try {
      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      }

      const { data } = await axios.post('/api/bookings', bookingData, config)

      console.log(data)
    } catch (error) {
      console.log((error as ErrorResponse).response)
    }
  }

  return (
    <>
      <Head>
        <title>{room.name} - BookIT</title>
      </Head>
      <div className="container container-fluid">
        <h2 className="mt-5">{room.name}</h2>
        <p>{room.address}</p>

        <div className="ratings mt-auto mb-3">
          <div className="rating-outer">
            <div
              className="rating-inner"
              style={{ width: `${(room.ratings / 5) * 100}%` }}
            ></div>
          </div>
          <span id="no_of_reviews">({room.numOfReviews} Reviews)</span>
        </div>
        <Carousel>
          {room.images &&
            room.images.map((image) => (
              <Carousel.Item key={image.public_id}>
                <div style={{ width: '100%', height: '440px' }}>
                  <Image
                    src={image.url}
                    alt={room.name}
                    className="d-block m-auto"
                    layout="fill"
                  />
                </div>
              </Carousel.Item>
            ))}
        </Carousel>
        <div className="row my-5">
          <div className="col-12 col-md-6 col-lg-8">
            <h3>Description</h3>
            <p>{room.description}</p>

            <Features room={room} />
          </div>
          <div className="col-12 col-md-6 col-lg-4">
            <div className="booking-card shadow-lg p-4">
              <p className="price-per-night">
                <b>${room.price}</b> / night
              </p>

              <hr />

              <p className="mt-5 mb-3">Pick Check In & Check Out Date</p>
              <DatePicker
                className="w-100"
                selected={checkInDate}
                onChange={onChange}
                startDate={checkInDate}
                endDate={checkOutDate}
                minDate={new Date()}
                selectsRange
                inline
                excludeDates={excludedDates}
              />
              {available === true && (
                <div className="alert alert-success my-3 font-weight-bold">
                  Room is available. Book now.
                </div>
              )}

              {available === false && (
                <div className="alert alert-danger my-3 font-weight-bold">
                  Room not available. Try different dates.
                </div>
              )}

              {available && !user && (
                <div className="alert alert-danger my-3 font-weight-bold">
                  Login to book room.
                </div>
              )}
              {available && user && (
                <button
                  disabled={bookingLoading}
                  className="btn btn-block py-3 booking-btn"
                  onClick={newBookingHandler}
                >
                  Pay - ${daysOfStay && daysOfStay * room.price}
                </button>
              )}
            </div>
          </div>
        </div>
        <NewReview id={id} />
        {room.reviews && room.reviews.length > 0 ? (
          <ListReviews reviews={room.reviews} />
        ) : (
          <p>
            <b>No Reviews on this room</b>
          </p>
        )}
      </div>
    </>
  )
}

export default RoomDetails
