import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, user, addLike, handleRemoveClick }) => {
  const [visible, setVisible] = useState(false)

  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const updateBlog = (event) => {
    event.preventDefault()
    addLike({
      id: blog.id,
      user: blog.user.id,
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url
    })
  }

  const removeBlog = (event) => {
    event.preventDefault()
    window.confirm(`Remove ${blog.title} by ${blog.author}?`) &&
      handleRemoveClick(blog)
  }

  const removeButton = () => {
    return (
      <div>
        <button
          className='btn btn-secondary btn-outline-info'
          onClick={removeBlog}>
          remove
        </button>
      </div>
    )
  }

  return (
    <div className='blog'>
      {blog.title} {blog.author} {' '}
      <button onClick={toggleVisibility}>
        {visible ? 'hide' : 'view'}
      </button>
      <div style={showWhenVisible}>
        <div>{blog.url}</div>
        <div>
          likes {blog.likes}
          <button onClick={updateBlog}>like</button>
        </div>
        <div>
          {blog.user.name}
        </div>
        {user.username === blog.user.username && removeButton()}
      </div>
    </div >
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  handleRemoveClick: PropTypes.func.isRequired
}

export default Blog
