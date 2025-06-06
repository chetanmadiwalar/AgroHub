import axios from 'axios'
import {
    CONSUMER_PRODUCT_LIST_REQUEST,
    CONSUMER_PRODUCT_LIST_SUCCESS,
    CONSUMER_PRODUCT_LIST_FAIL,
    CONSUMER_PRODUCT_DETAILS_REQUEST,
    CONSUMER_PRODUCT_DETAILS_SUCCESS,
    CONSUMER_PRODUCT_DETAILS_FAIL,
    CONSUMER_DELETE_REQUEST,
    CONSUMER_DELETE_SUCCESS,
    CONSUMER_DELETE_FAIL,
    CONSUMER_CREATE_REQUEST,
    CONSUMER_CREATE_SUCCESS,
    CONSUMER_CREATE_FAIL,
    CONSUMER_UPDATE_REQUEST,
    CONSUMER_UPDATE_SUCCESS,
    CONSUMER_UPDATE_FAIL,
    CONSUMER_UPDATE_RESET,
    PRODUCT_CREATE_REVIEW_FAIL,
    PRODUCT_CREATE_REVIEW_REQUEST,
    PRODUCT_CREATE_REVIEW_SUCCESS,
} from './../constants/productConstants'
import { logout } from './userActions'
export const listConsumerProducts = () => async (dispatch) => {
    try {
        dispatch({ type: CONSUMER_PRODUCT_LIST_REQUEST })

        const { data } = await axios.get('https://agrohub-backend.vercel.app/api/consumer')

        dispatch({
            type: CONSUMER_PRODUCT_LIST_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: CONSUMER_PRODUCT_LIST_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
        })
    }
}

export const listConsumerProductsDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: CONSUMER_PRODUCT_DETAILS_REQUEST })

        const { data } = await axios.get(`https://agrohub-backend.vercel.app/api/consumer/${id}`)

        dispatch({
            type: CONSUMER_PRODUCT_DETAILS_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: CONSUMER_PRODUCT_DETAILS_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
        })
    }
}

export const deleteConsumerProduct = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: CONSUMER_DELETE_REQUEST })

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            },
        }

        await axios.delete(`https://agrohub-backend.vercel.app/api/consumer/${id}`, config)

        dispatch({
            type: CONSUMER_DELETE_SUCCESS,
        })
    } catch (error) {
        dispatch({
            type: CONSUMER_DELETE_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
        })
    }
}

export const createConsumer = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: CONSUMER_CREATE_REQUEST })

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            },
        }

        const { data } = await axios.post(`https://agrohub-backend.vercel.app/api/consumer/`, {}, config)

        dispatch({
            type: CONSUMER_CREATE_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: CONSUMER_CREATE_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
        })
    }
}

export const updateConsumer = (consumer) => async (dispatch, getState) => {
    try {
        dispatch({ type: CONSUMER_UPDATE_REQUEST })

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            },
        }

        const { data } = await axios.put(`https://agrohub-backend.vercel.app/api/consumer/${consumer._id}`, consumer, config)

        dispatch({
            type: CONSUMER_UPDATE_SUCCESS,
            payload: data
        })

        dispatch({ type: CONSUMER_UPDATE_RESET })

    } catch (error) {
        dispatch({
            type: CONSUMER_UPDATE_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
        })
    }
}

export const createProductReview = (productId, review) => async (
    dispatch,
    getState
  ) => {
    try {
      dispatch({
        type: PRODUCT_CREATE_REVIEW_REQUEST,
      })
  
      const {
        userLogin: { userInfo },
      } = getState()
  
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
  
      await axios.post(`https://agrohub-backend.vercel.app/api/consumer/${productId}/reviews`, review, config)
  
      dispatch({
        type: PRODUCT_CREATE_REVIEW_SUCCESS,
      })
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      if (message === 'Not authorized, token failed') {
        dispatch(logout())
      }
      dispatch({
        type: PRODUCT_CREATE_REVIEW_FAIL,
        payload: message,
      })
    }
  }