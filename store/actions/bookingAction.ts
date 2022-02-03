import axios from 'axios'
import { Dispatch } from 'redux'
import {
  CHECK_BOOKING_FAIL,
  CHECK_BOOKING_REQUEST,
  CHECK_BOOKING_SUCCESS
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
