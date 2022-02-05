import { AnyAction } from 'redux'
import {
  ALL_ROOMS_FAIL,
  ALL_ROOMS_SUCCESS,
  ALL_ROOM_FAIL,
  ALL_ROOM_SUCCESS,
  CLEAR_ERRORS,
  NEW_REVIEW_FAIL,
  NEW_REVIEW_REQUEST,
  NEW_REVIEW_RESET,
  NEW_REVIEW_SUCCESS,
  REVIEW_AVAILABILITY_FAIL,
  REVIEW_AVAILABILITY_REQUEST,
  REVIEW_AVAILABILITY_SUCCESS
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

export const newReviewReducer = (state = {}, action: AnyAction) => {
  switch (action.type) {
    case NEW_REVIEW_REQUEST:
      return {
        loading: true
      }

    case NEW_REVIEW_SUCCESS:
      return {
        loading: false,
        success: action.payload
      }

    case NEW_REVIEW_RESET:
      return {
        success: false
      }

    case NEW_REVIEW_FAIL:
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

export const checkReviewReducer = (
  state = { reviewAvailable: null },
  action: AnyAction
) => {
  switch (action.type) {
    case REVIEW_AVAILABILITY_REQUEST:
      return {
        loading: true
      }

    case REVIEW_AVAILABILITY_SUCCESS:
      return {
        loading: false,
        reviewAvailable: action.payload
      }

    case REVIEW_AVAILABILITY_FAIL:
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
