import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
import loginService from '../services/login'
import { setMessage } from './messageReducer'
import { setErrorMessage } from './errorMessageReducer'

const initialState = null

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      return action.payload
    },
    clearUser() {
      return null
    }
  }
})

export const { setUser, clearUser } = userSlice.actions

export const createCredentials = (userObject) => {
  return async (dispatch) => {
    try {
      const user = await loginService.login(userObject)
      // loginFormRef.current.toggleVisibility()
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      dispatch(setUser(user))
      dispatch(setMessage('Login succeeded'))
    } catch (exception) {
      dispatch(setErrorMessage('Wrong username or password'))
    }
  }
}

export const clearCredentials = () => {
  return async (dispatch) => {
    window.localStorage.clear()
    blogService.setToken(null)
    dispatch(clearUser())
  }
}

export const setCurrentUser = (user) => {
  return async (dispatch) => {
    blogService.setToken(user.token)
    dispatch(setUser(user))
  }
}

export default userSlice.reducer
