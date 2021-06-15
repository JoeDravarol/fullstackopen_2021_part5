import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Blog from './Blog'

describe('<Blog />', () => {
  const blog = {
    title: 'Testing frontend with react-testing-library',
    author: 'Tester',
    url: 'https://testing-library.com/',
    likes: 0,
    user: {
      id: '1234'
    }
  }

  test('renders title and author', () => {
    const component = render(
      <Blog blog={blog} />
    )

    expect(component.container).toHaveTextContent(
      blog.title,
      blog.author
    )

    // Check if likes and url is hidden
    const div = component.container.querySelector('.togglableContent')
    expect(div).toHaveStyle('display: none')
  })

  test('after clicking the button, url and number of likes are shown', () => {
    const component = render(
      <Blog blog={blog} />
    )

    const button = component.getByText('view')
    fireEvent.click(button)

    const div = component.container.querySelector('.togglableContent')
    expect(div).not.toHaveStyle('display: none')
  })

  test('clicking the button two times calls event handler twice', () => {
    const mockHandler = jest.fn()

    const component = render(
      <Blog blog={blog} updateBlogLikes={mockHandler} />
    )

    const button = component.getByText('like')
    fireEvent.click(button)
    fireEvent.click(button)

    expect(mockHandler.mock.calls).toHaveLength(2)
  })
})