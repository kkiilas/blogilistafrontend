import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Blogs from './components/Blogs'
import LoginForm from './components/LoginForm'
import LogoutForm from './components/LogoutForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import Notification from './components/Notification'
import ErrorNotification from './components/ErrorNotification'
import { initializeBlogs } from './reducers/blogReducer'
import { setCurrentUser } from './reducers/userReducer'

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)
  const blogFormRef = useRef()
  // const loginFormRef = useRef()

  useEffect(() => {
    ;(async () => {
      dispatch(initializeBlogs())
    })()
  }, [dispatch])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setCurrentUser(user))
    }
  }, [dispatch])

  const loginForm = () => (
    // <Togglable buttonLabel='Log in' ref={loginFormRef} >
    <LoginForm />
    // </Togglable>
  )

  const blogForm = () => (
    <Togglable buttonLabel="Create a new blog" ref={blogFormRef}>
      <BlogForm blogFormRef={blogFormRef} />
    </Togglable>
  )

  if (user === null) {
    return (
      <div className="container">
        <h2>Log in to application</h2>
        <ErrorNotification />
        {loginForm()}
      </div>
    )
  }

  return (
    <div className="container">
      <h2>Blogs</h2>
      <ErrorNotification />
      <Notification />
      <LogoutForm />
      <br />
      {blogForm()}
      <Blogs />
    </div>
  )
}

export default App
