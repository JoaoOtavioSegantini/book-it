import { combineReducers } from 'redux'
import { allRoomReducer, roomDetailsReducer } from './roomReducers'
import { authReducer, loadedUserReducer, userReducer } from './userReducer'

const reducers = combineReducers({
  allRooms: allRoomReducer,
  roomDetails: roomDetailsReducer,
  auth: authReducer,
  currentUser: loadedUserReducer,
  user: userReducer
})

export default reducers
