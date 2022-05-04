import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog />', () => {
  let component
  const mockHandler = jest.fn()

  beforeEach(() => {
    const user = {
      name: 'Nipitiri',
      username: 'käyttäjä',
    }

    const blog = {
      title:
        'This Supreme Court May Be an Abomination. But It Is Not an Aberration.',
      author: 'Jamelle Bouie',
      url: 'https://www.nytimes.com/2022/02/11/opinion/supreme-court-alabama-maps.html',
      likes: 1,
      user: user,
    }

    component = render(
      <Blog
        blog={blog}
        user={user}
        addLike={mockHandler}
        handleRemoveClick={mockHandler}
      />
    )
    component
    // screen.debug()
  })

  test('at the start, title and author are displayed  while url and likes are not displayed', () => {
    expect(
      screen.getByText(
        'This Supreme Court May Be an Abomination. But It Is Not an Aberration. Jamelle Bouie'
      )
    ).toBeVisible()
    expect(
      screen.getByText(
        'https://www.nytimes.com/2022/02/11/opinion/supreme-court-alabama-maps.html'
      )
    ).not.toBeVisible()
    expect(screen.getByText('likes 1')).not.toBeVisible()
  })

  test('displays url and likes as well after clicking the view button', () => {
    const viewButton = component.getByText('view')
    fireEvent.click(viewButton)

    expect(
      screen.getByText(
        'https://www.nytimes.com/2022/02/11/opinion/supreme-court-alabama-maps.html'
      )
    ).toBeVisible()
    expect(screen.getByText('likes 1')).toBeVisible()
  })
  test('calls onClick twice after clicking the like button twice', () => {
    const likeButton = component.getByText('like')

    fireEvent.click(likeButton)
    fireEvent.click(likeButton)

    expect(mockHandler.mock.calls).toHaveLength(2)
  })
})
