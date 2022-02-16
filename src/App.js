import React, { useState, useEffect, useRef } from 'react'
import Blogs from './components/Blogs'
import LoginForm from './components/LoginForm'
import LogoutForm from './components/LogoutForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import Notification from './components/Notification'
import ErrorNotification from './components/ErrorNotification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [message, setMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [user, setUser] = useState(null)
  const blogFormRef = useRef()
  // const loginFormRef = useRef()

  const handleLogin = async (userObject) => {
    try {
      const user = await loginService.login(userObject)
      // loginFormRef.current.toggleVisibility()
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setMessage('Login succeeded')
      setTimeout(() => {
        setMessage(null)
      }, 3000)
    } catch (exception) {
      setErrorMessage('Wrong username or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 3000)
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
      createdBlog.user = user
      setBlogs(blogs.concat(createdBlog))
      setMessage(`A new blog ${createdBlog.title} by ${createdBlog.author}.`)
      setTimeout(() => {
        setMessage(null)
      }, 3000)
    } catch (exception) {
      setErrorMessage(exception.response.data.errorMessage)
      setTimeout(() => {
        setErrorMessage(null)
      }, 3000)
    }
  }

  const updateBlog = async (blogObject) => {
    const id = blogObject.id
    delete blogObject.id
    try {
      const updatedBlog = await blogService.update(id, blogObject)
      const updatedBlogs = blogs.map(blog => blog.id !== id ? blog : updatedBlog)
      setBlogs(updatedBlogs)
    } catch (exception) {
      setErrorMessage(`${blogObject.title} has already been removed from server`)
      setTimeout(() => {
        setErrorMessage(null)
      }, 3000)
    }
  }

  const removeBlog = async (blogToRemove) => {
    const id = blogToRemove.id
    try {
      await blogService.remove(id)
      setBlogs(blogs.filter(blog => blog.id !== id))
      setMessage(`Removed ${blogToRemove.title} by ${blogToRemove.author}`)
      setTimeout(() => {
        setMessage(null)
      }, 3000)
    } catch (exception) {
      setErrorMessage(exception.response.data.errorMessage)
      setTimeout(() => {
        setErrorMessage(null)
      }, 3000)
    }
  }

  useEffect(() => {
    (async () => {
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
    <Togglable buttonLabel='Create a new blog' ref={blogFormRef} >
      <BlogForm createBlog={addBlog} />
    </Togglable>
  )

  if (user === null) {
    return (
      <div className="container">
        <h2>Log in to application</h2>
        <ErrorNotification errorMessage={errorMessage} />
        {loginForm()}
      </div>
    )
  }

  return (
    <div className="container">
      <h2>Blogs</h2>
      <ErrorNotification errorMessage={errorMessage} />
      <Notification message={message} />
      <LogoutForm
        name={user.name}
        handleLogout={handleLogout}
      />
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
