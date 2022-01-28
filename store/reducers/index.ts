import { combineReducers } from 'redux'
import { allRoomReducer, roomDetailsReducer } from './roomReducers'

const reducers = combineReducers({
  allRooms: allRoomReducer,
  roomDetails: roomDetailsReducer
})

export default reducers
