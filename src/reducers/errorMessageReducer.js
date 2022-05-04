import { createSlice } from '@reduxjs/toolkit'

let timeoutID

const errorMessageSlice = createSlice({
  name: 'errorMessage',
  initialState: '',
  reducers: {
    startErrorMessage(state, action) {
      return action.payload
    },
    clearErrorMessage() {
      return ''
    },
  },
})

export const { clearErrorMessage, startErrorMessage } =
  errorMessageSlice.actions

export const setErrorMessage = (errorMessage) => {
  return (dispatch) => {
    clearTimeout(timeoutID)
    dispatch(startErrorMessage(errorMessage))
    timeoutID = setTimeout(() => {
      dispatch(clearErrorMessage())
    }, 3000)
  }
}

export default errorMessageSlice.reducer
