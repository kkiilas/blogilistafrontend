import React from 'react'
import { fireEvent } from '@testing-library/react'
import { render } from './test-utils'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'
import * as userReducer from '../reducers/blogReducer'

test('<BlogForm /> updates states and calls onSubmit', () => {
  const component = render(<BlogForm />)

  const title = component.container.querySelector('#title')
  const author = component.container.querySelector('#author')
  const url = component.container.querySelector('#url')
  const form = component.container.querySelector('form')

  const spy = jest.spyOn(userReducer, 'createBlog')

  fireEvent.change(title, {
    target: {
      value:
        'White House Warns Russian Invasion of Ukraine Could Happen at Any Time'
    }
  })
  fireEvent.change(author, {
    target: { value: 'Katie Rogers and Andrew E. Kramer' }
  })
  fireEvent.change(url, {
    target: {
      value:
        'https://www.nytimes.com/2022/02/11/world/europe/ukraine-russia-diplomacy.html'
    }
  })
  fireEvent.submit(form)
  expect(spy.mock.calls).toHaveLength(1)
  expect(spy.mock.calls[0][0].title).toBe(
    'White House Warns Russian Invasion of Ukraine Could Happen at Any Time'
  )
  expect(spy.mock.calls[0][0].author).toBe('Katie Rogers and Andrew E. Kramer')
  expect(spy.mock.calls[0][0].url).toBe(
    'https://www.nytimes.com/2022/02/11/world/europe/ukraine-russia-diplomacy.html'
  )
})
