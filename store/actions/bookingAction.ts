import axios from 'axios'
import { NextApiRequest } from 'next'
import absoluteUrl from 'next-absolute-url'
import { Dispatch } from 'redux'
import {
  BOOKED_DATES_FAIL,
  BOOKED_DATES_SUCCESS,
  BOOKING_DETAILS_FAIL,
  BOOKING_DETAILS_SUCCESS,
  CHECK_BOOKING_FAIL,
  CHECK_BOOKING_REQUEST,
  CHECK_BOOKING_SUCCESS,
  CLEAR_ERRORS,
  MY_BOOKINGS_FAIL,
  MY_BOOKINGS_SUCCESS
} from 'store/constants/bookingContants'
import { Availability } from 'types/booking'
import { ErrorResponse } from 'types/error'

export const checkBooking =
  ({ roomId, checkInDate, checkOutDate }: Availability) =>
  async (dispatch: Dispatch) => {
    try {
      dispatch({ type: CHECK_BOOKING_REQUEST })

      const link = `/api/bookings/check?roomId=${roomId}&checkInDate=${checkInDate?.toISOString()}&checkOutDate=${checkOutDate?.toISOString()}`

      const { data } = await axios.get(link)

      dispatch({
        type: CHECK_BOOKING_SUCCESS,
        payload: data.isAvailable
      })
    } catch (error) {
      dispatch({
        type: CHECK_BOOKING_FAIL,
        payload: (error as ErrorResponse).response.data.message
      })
    }
  }

export const getBookedDates = (id: string) => async (dispatch: Dispatch) => {
  try {
    const { data } = await axios.get(
      `/api/bookings/check_booked_dates?roomId=${id}`
    )

    dispatch({
      type: BOOKED_DATES_SUCCESS,
      payload: data.bookedDates
    })
  } catch (error) {
    dispatch({
      type: BOOKED_DATES_FAIL,
      payload: (error as ErrorResponse).response.data.message
    })
  }
}

export const myBookings =
  (authCookie: string, req: NextApiRequest) => async (dispatch: Dispatch) => {
    try {
      const { origin } = absoluteUrl(req)

      const config = {
        headers: {
          cookie: authCookie
        }
      }

      const { data } = await axios.get(`${origin}/api/bookings/me`, config)

      dispatch({
        type: MY_BOOKINGS_SUCCESS,
        payload: data.bookings
      })
    } catch (error) {
      dispatch({
        type: MY_BOOKINGS_FAIL,
        payload: (error as ErrorResponse).response.data.message
      })
    }
  }

export const getBookingDetails =
  (authCookie: string, req: NextApiRequest, id: string) =>
  async (dispatch: Dispatch) => {
    try {
      const { origin } = absoluteUrl(req)

      const config = {
        headers: {
          cookie: authCookie
        }
      }

      const { data } = await axios.get(`${origin}/api/bookings/${id}`, config)

      dispatch({
        type: BOOKING_DETAILS_SUCCESS,
        payload: data.booking
      })
    } catch (error) {
      dispatch({
        type: BOOKING_DETAILS_FAIL,
        payload: (error as ErrorResponse).response.data.message
      })
    }
  }
// Clear Errors
export const clearErrors = () => async (dispatch: Dispatch) => {
  dispatch({
    type: CLEAR_ERRORS
  })
}
