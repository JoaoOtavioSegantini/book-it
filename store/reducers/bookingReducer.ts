import { AnyAction } from 'redux'
import {
  ADMIN_BOOKINGS_REQUEST,
  BOOKED_DATES_FAIL,
  BOOKED_DATES_SUCCESS,
  BOOKING_DETAILS_FAIL,
  BOOKING_DETAILS_SUCCESS,
  CHECK_BOOKING_FAIL,
  CHECK_BOOKING_REQUEST,
  CHECK_BOOKING_RESET,
  CHECK_BOOKING_SUCCESS,
  CLEAR_ERRORS,
  MY_BOOKINGS_FAIL,
  MY_BOOKINGS_SUCCESS
} from 'store/constants/bookingContants'

// Check Booking
export const checkBookingReducer = (
  state = { available: null },
  action: AnyAction
) => {
  switch (action.type) {
    case CHECK_BOOKING_REQUEST:
      return {
        loading: true
      }

    case CHECK_BOOKING_SUCCESS:
      return {
        loading: false,
        available: action.payload
      }

    case CHECK_BOOKING_RESET:
      return {
        loading: false,
        available: null
      }

    case CHECK_BOOKING_FAIL:
      return {
        loading: false,
        error: action.payload
      }

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null
      }

    default:
      return state
  }
}

export const bookedDatesReducer = (
  state = { dates: [] },
  action: AnyAction
) => {
  switch (action.type) {
    case BOOKED_DATES_SUCCESS:
      return {
        loading: false,
        dates: action.payload
      }

    case BOOKED_DATES_FAIL:
      return {
        loading: false,
        error: action.payload
      }

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null
      }

    default:
      return state
  }
}

export const bookingsReducer = (
  state = { bookings: [] },
  action: AnyAction
) => {
  switch (action.type) {
    case ADMIN_BOOKINGS_REQUEST:
      return {
        loading: true
      }

    case MY_BOOKINGS_SUCCESS:
      return {
        loading: false,
        bookings: action.payload
      }

    case MY_BOOKINGS_FAIL:
      return {
        loading: false,
        error: action.payload
      }

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null
      }

    default:
      return state
  }
}

export const bookingDetailsReducer = (
  state = { booking: {} },
  action: AnyAction
) => {
  switch (action.type) {
    case BOOKING_DETAILS_SUCCESS:
      return {
        loading: false,
        booking: action.payload
      }

    case BOOKING_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload
      }

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null
      }

    default:
      return state
  }
}
