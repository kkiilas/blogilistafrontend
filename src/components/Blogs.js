import React from 'react'
import { useSelector } from 'react-redux'
import Blog from './Blog'

const Blogs = () => {
  const extractAuthorsSurname = (blog) =>
    blog.author.split(' and ')[0].split(', ')[0].split(' ').pop().toUpperCase()

  const compare = (blog1, blog2) => {
    const likes1 = blog1.likes
    const likes2 = blog2.likes
    const author1 = extractAuthorsSurname(blog1)
    const author2 = extractAuthorsSurname(blog2)
    // prettier-ignore
    return likes1 !== likes2
      ? likes2 - likes1
      : author1 < author2
        ? -1
        : author1 > author2
          ? 1
          : 0
  }

  const blogs = useSelector(({ blogs }) => [...blogs].sort(compare))

  return (
    <div>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  )
}

export default Blogs
