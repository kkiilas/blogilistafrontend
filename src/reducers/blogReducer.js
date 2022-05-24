import { createSlice } from '@reduxjs/toolkit'
import { setMessage } from './messageReducer'
import { setErrorMessage } from './errorMessageReducer'
import blogService from '../services/blogs'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload
    },
    appendBlog(state, action) {
      state.push(action.payload)
    },
    updateBlog(state, action) {
      const updatedBlog = action.payload
      const id = updatedBlog.id
      return state.map((blog) => (blog.id !== id ? blog : updatedBlog))
    },
    removeBlog(state, action) {
      const id = action.payload
      return state.filter((blog) => blog.id !== id)
    }
  }
})

export const { setBlogs, appendBlog, updateBlog, removeBlog } =
  blogSlice.actions

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const createBlog = (blogObject, blogFormRef, user) => {
  return async (dispatch) => {
    try {
      const newBlog = await blogService.create(blogObject)
      blogFormRef.current.toggleVisibility()
      newBlog.user = user
      dispatch(appendBlog(newBlog))
      dispatch(setMessage(`A new blog ${newBlog.title} by ${newBlog.author}.`))
    } catch (exception) {
      dispatch(setErrorMessage(exception.response.data.error))
    }
  }
}

export const addLike = (blogObject) => {
  return async (dispatch) => {
    try {
      const id = blogObject.id
      delete blogObject.id
      const updatedBlog = await blogService.update(id, blogObject)
      dispatch(updateBlog(updatedBlog))
    } catch (exception) {
      dispatch(
        setErrorMessage(
          `${blogObject.title} has already been removed from server`
        )
      )
    }
  }
}

export const remove = (blogToRemove) => {
  const id = blogToRemove.id
  return async (dispatch) => {
    try {
      await blogService.remove(id)
      dispatch(removeBlog(id))
      dispatch(
        setMessage(`Removed ${blogToRemove.title} by ${blogToRemove.author}`)
      )
    } catch (exception) {
      dispatch(setErrorMessage(exception.response.data.error))
    }
  }
}

export default blogSlice.reducer
