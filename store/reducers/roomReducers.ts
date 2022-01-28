import { AnyAction } from 'redux'
import {
  ALL_ROOMS_FAIL,
  ALL_ROOMS_SUCCESS,
  ALL_ROOM_FAIL,
  ALL_ROOM_SUCCESS,
  CLEAR_ERRORS
} from 'store/constants/roomContants'

export const allRoomReducer = (state = { rooms: [] }, action: AnyAction) => {
  switch (action.type) {
    case ALL_ROOMS_SUCCESS:
      return {
        roomsCount: action.payload.roomCount,
        resPerPage: action.payload.resPerPage,
        filteredRoomsCount: action.payload.filteredRoomsCount,
        rooms: action.payload.rooms
      }
    case ALL_ROOMS_FAIL:
      return {
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
export const roomDetailsReducer = (state = { room: [] }, action: AnyAction) => {
  switch (action.type) {
    case ALL_ROOM_SUCCESS:
      return {
        room: action.payload.room
      }
    case ALL_ROOM_FAIL:
      return {
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
