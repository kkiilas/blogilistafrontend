import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'

test('<BlogForm /> updates states and calls onSubmit', () => {
  const createBlog = jest.fn()

  const component = render(
    <BlogForm createBlog={createBlog} />
  )

  const title = component.container.querySelector('#title')
  const author = component.container.querySelector('#author')
  const url = component.container.querySelector('#url')
  const form = component.container.querySelector('form')

  fireEvent.change(title, {
    target: { value: 'White House Warns Russian Invasion of Ukraine Could Happen at Any Time' }
  })
  fireEvent.change(author, {
    target: { value: 'Katie Rogers and Andrew E. Kramer' }
  })
  fireEvent.change(url, {
    target: { value: 'https://www.nytimes.com/2022/02/11/world/europe/ukraine-russia-diplomacy.html' }
  })
  fireEvent.submit(form)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('White House Warns Russian Invasion of Ukraine Could Happen at Any Time' )
  expect(createBlog.mock.calls[0][0].author).toBe('Katie Rogers and Andrew E. Kramer' )
  expect(createBlog.mock.calls[0][0].url).toBe('https://www.nytimes.com/2022/02/11/world/europe/ukraine-russia-diplomacy.html' )
})