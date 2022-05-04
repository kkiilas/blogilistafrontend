import { createSlice } from '@reduxjs/toolkit'

let timeoutID

const messageSlice = createSlice({
  name: 'message',
  initialState: '',
  reducers: {
    startMessage(state, action) {
      return action.payload
    },
    clearMessage() {
      return ''
    },
  },
})

export const { clearMessage, startMessage } = messageSlice.actions

export const setMessage = (message) => {
  return (dispatch) => {
    clearTimeout(timeoutID)
    dispatch(startMessage(message))
    timeoutID = setTimeout(() => {
      dispatch(clearMessage())
    }, 3000)
  }
}

export default messageSlice.reducer
