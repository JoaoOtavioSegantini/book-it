import { Dispatch } from 'redux'
import axios from 'axios'
import {
  CLEAR_ERRORS,
  FORGOT_PASSWORD_FAIL,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  LOAD_USER_FAIL,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  REGISTER_USER_FAIL,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  RESET_PASSWORD_FAIL,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  UPDATE_USER_PROFILE_FAIL,
  UPDATE_USER_PROFILE_REQUEST,
  UPDATE_USER_PROFILE_SUCCESS
} from 'store/constants/userContants'

export type ErrorResponse = {
  response: {
    data: {
      message: string
    }
  }
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const authUser = (userData: any) => async (dispatch: Dispatch) => {
  try {
    dispatch({ type: REGISTER_USER_REQUEST })

    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }

    const { data } = await axios.post('/api/auth/register', userData, config)
    console.log(data)

    dispatch({
      type: REGISTER_USER_SUCCESS
    })
  } catch (error: ErrorResponse | unknown) {
    dispatch({
      type: REGISTER_USER_FAIL,
      payload: (error as ErrorResponse).response.data.message
    })
  }
}

export const loadUser = () => async (dispatch: Dispatch) => {
  try {
    dispatch({ type: LOAD_USER_REQUEST })

    const { data } = await axios.get('/api/me')

    dispatch({
      type: LOAD_USER_SUCCESS,
      payload: data.user
    })
  } catch (error: ErrorResponse | unknown) {
    dispatch({
      type: LOAD_USER_FAIL,
      payload: (error as ErrorResponse).response.data.message
    })
  }
}

export const updateUserProfile =
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (userData: any) => async (dispatch: Dispatch) => {
    try {
      dispatch({ type: UPDATE_USER_PROFILE_REQUEST })

      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      }

      const { data } = await axios.put('/api/me/update', userData, config)

      dispatch({
        type: UPDATE_USER_PROFILE_SUCCESS,
        payload: data.success
      })
    } catch (error: ErrorResponse | unknown) {
      dispatch({
        type: UPDATE_USER_PROFILE_FAIL,
        payload: (error as ErrorResponse).response.data.message
      })
    }
  }

export const forgotPassword =
  (userData: { email: string }) => async (dispatch: Dispatch) => {
    try {
      dispatch({ type: FORGOT_PASSWORD_REQUEST })

      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      }

      const { data } = await axios.post(
        '/api/password/forgot',
        userData,
        config
      )

      dispatch({
        type: FORGOT_PASSWORD_SUCCESS,
        payload: data.message
      })
    } catch (error: ErrorResponse | unknown) {
      dispatch({
        type: FORGOT_PASSWORD_FAIL,
        payload: (error as ErrorResponse).response.data.message
      })
    }
  }

// Reset Password action
export const resetPassword =
  (
    token: string | string[],
    passwords: { password: string; confirmPassword: string }
  ) =>
  async (dispatch: Dispatch) => {
    try {
      dispatch({ type: RESET_PASSWORD_REQUEST })

      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      }

      const { data } = await axios.put(
        `/api/password/reset/${token}`,
        passwords,
        config
      )

      dispatch({
        type: RESET_PASSWORD_SUCCESS,
        payload: data.success
      })
    } catch (error) {
      dispatch({
        type: RESET_PASSWORD_FAIL,
        payload: (error as ErrorResponse).response.data.message
      })
    }
  }

export const clearErrors = () => async (dispatch: Dispatch) => {
  dispatch({
    type: CLEAR_ERRORS
  })
}
