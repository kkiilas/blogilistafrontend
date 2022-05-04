import { configureStore } from '@reduxjs/toolkit'
import messageReducer from './reducers/messageReducer'
import errorMessageReducer from './reducers/errorMessageReducer'

const store = configureStore({
  reducer: {
    message: messageReducer,
    errorMessage: errorMessageReducer
  }
})

export default store
