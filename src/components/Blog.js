import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import { addLike, remove } from '../reducers/blogReducer'

const Blog = ({ blog }) => {
  const dispatch = useDispatch()
  const username = useSelector((state) => state.user.username)
  const [visible, setVisible] = useState(false)

  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const handleLikeClick = (event) => {
    event.preventDefault()
    dispatch(
      addLike({
        ...blog,
        likes: blog.likes + 1
      })
    )
  }

  const handleRemoveClick = (event) => {
    event.preventDefault()
    window.confirm(`Remove ${blog.title} by ${blog.author}?`) &&
      dispatch(remove(blog))
  }

  const removeButton = () => {
    return (
      <div>
        <button
          className="btn btn-secondary btn-outline-info"
          onClick={handleRemoveClick}
        >
          remove
        </button>
      </div>
    )
  }

  return (
    <div className="blog">
      {blog.title} {blog.author}{' '}
      <button onClick={toggleVisibility}>{visible ? 'hide' : 'view'}</button>
      <div style={showWhenVisible}>
        <div>{blog.url}</div>
        <div>
          likes {blog.likes}
          <button onClick={handleLikeClick}>like</button>
        </div>
        <div>{blog.user.name}</div>
        {username === blog.user.username && removeButton()}
      </div>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired
}

export default Blog
