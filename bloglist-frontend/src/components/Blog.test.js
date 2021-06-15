import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Blog from './Blog'

describe('<Blog />', () => {
  const blog = {
    title: 'Testing frontend with react-testing-library',
    author: 'Tester',
    url: 'https://testing-library.com/',
    likes: 0
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
})