import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'

test('<BlogForm /> updates parent state and call onSubmit', () => {
  const createBlog = jest.fn()

  const component = render(
    <BlogForm createBlog={createBlog} />
  )

  const titleInput = component.container.querySelector('#title')
  const authorInput = component.container.querySelector('#author')
  const urlInput = component.container.querySelector('#url')
  const form = component.container.querySelector('form')

  fireEvent.change(titleInput, {
    target: { value: 'testing of forms is a little difficult' }
  })
  fireEvent.change(authorInput, {
    target: { value: 'Tester' }
  })
  fireEvent.change(urlInput, {
    target: { value: 'https://testing-library.com/docs/example-react-transition-group/#mock' }
  })
  fireEvent.submit(form)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('testing of forms is a little difficult')
  expect(createBlog.mock.calls[0][0].author).toBe('Tester')
  expect(createBlog.mock.calls[0][0].url).toBe('https://testing-library.com/docs/example-react-transition-group/#mock')
})