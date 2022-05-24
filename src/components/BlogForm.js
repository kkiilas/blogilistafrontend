import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useField } from '../hooks/index'
import { createBlog } from '../reducers/blogReducer'

const BlogForm = ({ blogFormRef }) => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)
  const { reset: resetTitle, ...title } = useField('title', 'text')
  const { reset: resetAuthor, ...author } = useField('author', 'text')
  const { reset: resetUrl, ...url } = useField('url', 'url')

  const addBlog = (event) => {
    event.preventDefault()
    const blogObject = {
      url: url.value,
      title: title.value,
      author: author.value
    }
    resetTitle()
    resetAuthor()
    resetUrl()
    dispatch(createBlog(blogObject, blogFormRef, user))
  }

  return (
    <div>
      <h2>Create new</h2>
      <form onSubmit={addBlog}>
        <div>
          title:
          <input {...title} />
        </div>
        <div>
          author:
          <input {...author} />
        </div>
        <div>
          url:
          <input {...url} />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default BlogForm
