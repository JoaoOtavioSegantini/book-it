import {
  ALL_ROOMS_FAIL,
  ALL_ROOMS_SUCCESS,
  ALL_ROOM_FAIL,
  ALL_ROOM_SUCCESS,
  CLEAR_ERRORS
} from 'store/constants/roomContants'
import axios from 'axios'
import aboluteUrl from 'next-absolute-url'
import { NextApiRequest } from 'next'
import { Dispatch } from 'redux'
import { Params } from 'next/dist/server/router'

export type ErrorResponse = {
  response: {
    data: {
      message: string
    }
  }
}
export const getRooms =
  (
    req: NextApiRequest,
    currentPage = 1,
    location = '',
    guests: number,
    category: string
  ) =>
  async (dispatch: Dispatch) => {
    try {
      const { origin } = aboluteUrl(req)

      let link = `${origin}/api/rooms?page=${currentPage}&location=${location}`

      if (guests) link = link.concat(`&guestCapacity=${guests}`)
      if (category) link = link.concat(`&category=${category}`)
      const { data } = await axios.get(link)

      dispatch({
        type: ALL_ROOMS_SUCCESS,
        payload: data
      })
    } catch (error: ErrorResponse | unknown) {
      dispatch({
        type: ALL_ROOMS_FAIL,
        payload: (error as ErrorResponse).response.data.message
      })
    }
  }

export const getRoomDetails =
  (req: NextApiRequest, id: Params) => async (dispatch: Dispatch) => {
    try {
      const { origin } = aboluteUrl(req)
      let url

      if (req) {
        url = `${origin}/api/rooms/${id}`
      } else {
        url = `/api/rooms/${id}`
      }

      const { data } = await axios.get(url)

      dispatch({
        type: ALL_ROOM_SUCCESS,
        payload: data
      })
    } catch (error: ErrorResponse | unknown) {
      dispatch({
        type: ALL_ROOM_FAIL,
        payload: (error as ErrorResponse).response.data.message
      })
    }
  }

// Clear Errors
export const clearErrors = () => async (dispatch: Dispatch) => {
  dispatch({
    type: CLEAR_ERRORS
  })
}
