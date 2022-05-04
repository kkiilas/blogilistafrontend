import React, { useState, useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'
import Blogs from './components/Blogs'
import LoginForm from './components/LoginForm'
import LogoutForm from './components/LogoutForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import Notification from './components/Notification'
import ErrorNotification from './components/ErrorNotification'
import blogService from './services/blogs'
import loginService from './services/login'
import { setMessage } from './reducers/messageReducer'
import { setErrorMessage } from './reducers/errorMessageReducer'

const App = () => {
  const dispatch = useDispatch()
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const blogFormRef = useRef()
  // const loginFormRef = useRef()

  const handleLogin = async (userObject) => {
    try {
      const user = await loginService.login(userObject)
      // loginFormRef.current.toggleVisibility()
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      dispatch(setMessage('Login succeeded'))
    } catch (exception) {
      dispatch(setErrorMessage('Wrong username or password'))
    }
  }

  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.clear()
    blogService.setToken(null)
    setUser(null)
  }

  const addBlog = async (blogObject) => {
    try {
      const createdBlog = await blogService.create(blogObject)
      blogFormRef.current.toggleVisibility()
      console.log('addBlog user', user)
      createdBlog.user = user
      setBlogs(blogs.concat(createdBlog))
      dispatch(
        setMessage(`A new blog ${createdBlog.title} by ${createdBlog.author}.`)
      )
      console.log('addBlog blogs', blogs)
    } catch (exception) {
      dispatch(setErrorMessage(exception.response.data.error))
    }
  }

  const updateBlog = async (blogObject) => {
    const id = blogObject.id
    delete blogObject.id
    try {
      const updatedBlog = await blogService.update(id, blogObject)
      const updatedBlogs = blogs.map((blog) =>
        blog.id !== id ? blog : updatedBlog
      )
      setBlogs(updatedBlogs)
    } catch (exception) {
      dispatch(
        setErrorMessage(
          `${blogObject.title} has already been removed from server`
        )
      )
    }
  }

  const removeBlog = async (blogToRemove) => {
    const id = blogToRemove.id
    try {
      await blogService.remove(id)
      setBlogs(blogs.filter((blog) => blog.id !== id))
      dispatch(
        setMessage(`Removed ${blogToRemove.title} by ${blogToRemove.author}`)
      )
    } catch (exception) {
      dispatch(setErrorMessage(exception.response.data.error))
    }
  }

  useEffect(() => {
    ;(async () => {
      const blogs = await blogService.getAll()
      setBlogs(blogs)
    })()
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const loginForm = () => (
    // <Togglable buttonLabel='Log in' ref={loginFormRef} >
    <LoginForm createCredentials={handleLogin} />
    // </Togglable>
  )

  const blogForm = () => (
    <Togglable buttonLabel="Create a new blog" ref={blogFormRef}>
      <BlogForm createBlog={addBlog} />
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
      <LogoutForm name={user.name} handleLogout={handleLogout} />
      <br />
      {blogForm()}
      <Blogs
        blogs={blogs}
        user={user}
        addLike={updateBlog}
        handleRemoveClick={removeBlog}
      />
    </div>
  )
}

export default App
