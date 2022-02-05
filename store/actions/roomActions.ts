import {
  ALL_ROOMS_FAIL,
  ALL_ROOMS_SUCCESS,
  ALL_ROOM_FAIL,
  ALL_ROOM_SUCCESS,
  CLEAR_ERRORS,
  DELETE_REVIEW_FAIL,
  DELETE_REVIEW_REQUEST,
  DELETE_REVIEW_SUCCESS,
  GET_REVIEWS_FAIL,
  GET_REVIEWS_REQUEST,
  GET_REVIEWS_SUCCESS,
  NEW_REVIEW_FAIL,
  NEW_REVIEW_REQUEST,
  NEW_REVIEW_SUCCESS,
  REVIEW_AVAILABILITY_FAIL,
  REVIEW_AVAILABILITY_REQUEST,
  REVIEW_AVAILABILITY_SUCCESS
} from 'store/constants/roomContants'
import axios from 'axios'
import aboluteUrl from 'next-absolute-url'
import { NextApiRequest } from 'next'
import { Dispatch } from 'redux'
import { Params } from 'next/dist/server/router'
import { ErrorResponse } from 'types/error'

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

export const newReview = (reviewData: object) => async (dispatch: Dispatch) => {
  try {
    dispatch({ type: NEW_REVIEW_REQUEST })

    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }

    const { data } = await axios.put(`/api/reviews`, reviewData, config)

    dispatch({
      type: NEW_REVIEW_SUCCESS,
      payload: data.success
    })
  } catch (error) {
    dispatch({
      type: NEW_REVIEW_FAIL,
      payload: (error as ErrorResponse).response.data.message
    })
  }
}

export const checkReviewAvailability =
  (roomId: string) => async (dispatch: Dispatch) => {
    try {
      dispatch({ type: REVIEW_AVAILABILITY_REQUEST })

      const { data } = await axios.get(
        `/api/reviews/check_review_availability?roomId=${roomId}`
      )

      dispatch({
        type: REVIEW_AVAILABILITY_SUCCESS,
        payload: data.isReviewAvailable
      })
    } catch (error) {
      dispatch({
        type: REVIEW_AVAILABILITY_FAIL,
        payload: (error as ErrorResponse).response.data.message
      })
    }
  }

export const getRoomReviews = (id: string) => async (dispatch: Dispatch) => {
  try {
    dispatch({ type: GET_REVIEWS_REQUEST })

    const { data } = await axios.get(`/api/reviews/?id=${id}`)

    dispatch({
      type: GET_REVIEWS_SUCCESS,
      payload: data.reviews
    })
  } catch (error) {
    dispatch({
      type: GET_REVIEWS_FAIL,
      payload: (error as ErrorResponse).response.data.message
    })
  }
}

export const deleteReview =
  (id: string, roomId: string) => async (dispatch: Dispatch) => {
    try {
      dispatch({ type: DELETE_REVIEW_REQUEST })

      const { data } = await axios.delete(
        `/api/reviews/?id=${id}&roomId=${roomId}`
      )

      dispatch({
        type: DELETE_REVIEW_SUCCESS,
        payload: data.success
      })
    } catch (error) {
      dispatch({
        type: DELETE_REVIEW_FAIL,
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
