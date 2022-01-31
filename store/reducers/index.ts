import { combineReducers } from 'redux'
import { allRoomReducer, roomDetailsReducer } from './roomReducers'
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
  forgotPassword: forgotPasswordReducer
})

export default reducers
