import React, { useState } from 'react'

const Blog = ({ blog, updateBlogLikes }) => {
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

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author}
        <button onClick={toggleVisibility}>
          {visible ? 'hide' : 'view'}
        </button>
      </div>

      <div style={showWhenVisible}>
        <p>{blog.url}</p>
        <div>
          likes {blog.likes}
          <button onClick={incrementLikes}>like</button>
        </div>
        <p>{blog.author}</p>
      </div>
    </div>
  )
}

export default Blog