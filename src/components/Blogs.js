import React from 'react'
import PropTypes from 'prop-types'
import Blog from './Blog'

const Blogs = ({ blogs, user, addLike, handleRemoveClick }) => {

  const extractAuthorsSurname = blog => blog.author
    .split(' and ')[0]
    .split(', ')[0]
    .split(' ')
    .pop().toUpperCase()

  const compare = (blog1, blog2) => {
    const likes1 = blog1.likes
    const likes2 = blog2.likes
    const author1 = extractAuthorsSurname(blog1)
    const author2 = extractAuthorsSurname(blog2)

    return likes1 !== likes2 ? likes2 - likes1
      : author1 < author2 ? -1
        : author1 > author2 ? 1
          : 0
  }

  return (
    <div>
      {blogs.sort(compare)
        .map(blog =>
          <Blog
            key={blog.id}
            blog={blog}
            user={user}
            addLike={addLike}
            handleRemoveClick={handleRemoveClick}
          />
        )}
    </div>
  )
}

Blogs.propTypes = {
  blogs: PropTypes.array.isRequired,
  user: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  handleRemoveClick: PropTypes.func.isRequired
}

export default Blogs
