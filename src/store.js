import { configureStore } from '@reduxjs/toolkit'
import blogReducer from './reducers/blogReducer'
import errorMessageReducer from './reducers/errorMessageReducer'
import messageReducer from './reducers/messageReducer'
import userReducer from './reducers/userReducer'

const store = configureStore({
  reducer: {
    blogs: blogReducer,
    errorMessage: errorMessageReducer,
    message: messageReducer,
    user: userReducer
  }
})

export default store
