import { combineReducers } from 'redux'
import {
  bookedDatesReducer,
  bookingDetailsReducer,
  bookingsReducer,
  checkBookingReducer
} from './bookingReducer'
import {
  allRoomReducer,
  roomDetailsReducer,
  newReviewReducer,
  checkReviewReducer
} from './roomReducers'
import {
  authReducer,
  forgotPasswordReducer,
  loadedUserReducer,
  userReducer
} from './userReducer'

const reducers = combineReducers({
  allRooms: allRoomReducer,
  roomDetails: roomDetailsReducer,
  auth: authReducer,
  currentUser: loadedUserReducer,
  user: userReducer,
  forgotPassword: forgotPasswordReducer,
  checkingBook: checkBookingReducer,
  bookedDates: bookedDatesReducer,
  bookings: bookingsReducer,
  bookingDetails: bookingDetailsReducer,
  newReview: newReviewReducer,
  checkReview: checkReviewReducer
})

export default reducers
