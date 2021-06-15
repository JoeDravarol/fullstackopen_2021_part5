import React, { useState } from 'react'

const Blog = ({ blog, updateBlogLikes, removeBlog }) => {
  const [visible, setVisible] = useState(false)

  const showWhenVisible = { display: visible ? '' : 'none' }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const incrementLikes = () => {
    const newBlog = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
      user: blog.user.id
    }

    updateBlogLikes(blog.id, newBlog)
  }

  const deleteBlog = () => {
    const confirmedDeletion = window.confirm(`Remove blog ${blog.title} by ${blog.author}`)

    if (confirmedDeletion) {
      removeBlog(blog.id)
    }
  }

  return (
    <div style={blogStyle} className='blog'>
      <div>
        {blog.title} {blog.author}
        <button onClick={toggleVisibility}>
          {visible ? 'hide' : 'view'}
        </button>
      </div>

      <div style={showWhenVisible} className='togglableContent'>
        <p>{blog.url}</p>
        <div>
          likes {blog.likes}
          <button onClick={incrementLikes}>like</button>
        </div>
        <p>{blog.author}</p>

        <div>
          <button onClick={deleteBlog}>remove</button>
        </div>
      </div>
    </div>
  )
}

export default Blog