import { AnyAction } from 'redux'
import {
  CLEAR_ERRORS,
  LOAD_USER_FAIL,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  REGISTER_USER_FAIL,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  UPDATE_PROFILE_RESET,
  UPDATE_USER_PROFILE_FAIL,
  UPDATE_USER_PROFILE_REQUEST,
  UPDATE_USER_PROFILE_SUCCESS
} from 'store/constants/userContants'

export const authReducer = (state = { user: null }, action: AnyAction) => {
  switch (action.type) {
    case UPDATE_USER_PROFILE_REQUEST:
    case REGISTER_USER_REQUEST:
      return {
        loading: true
      }

    case REGISTER_USER_SUCCESS:
      return {
        success: true,
        loading: false
      }

    case REGISTER_USER_FAIL:
      return {
        error: action.payload,
        loading: false
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

export const loadedUserReducer = (
  state = { loading: true, user: null },
  action: AnyAction
) => {
  switch (action.type) {
    case LOAD_USER_REQUEST:
      return {
        loading: true,
        isAuthenticated: false
      }

    case LOAD_USER_SUCCESS:
      return {
        loading: false,
        isAuthenticated: true,
        user: action.payload
      }

    case LOAD_USER_FAIL:
      return {
        loading: false,
        isAuthenticated: false,
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

export const userReducer = (state = {}, action: AnyAction) => {
  switch (action.type) {
    case UPDATE_USER_PROFILE_REQUEST:
      return {
        loading: true
      }

    case UPDATE_USER_PROFILE_SUCCESS:
      return {
        isUpdated: action.payload,
        loading: false
      }

    case UPDATE_PROFILE_RESET:
      return {
        loading: false,
        isUpdated: false
      }

    case UPDATE_USER_PROFILE_FAIL:
      return {
        error: action.payload,
        loading: false
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
