import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      blogService.setToken(user.token)
      setUser(user)
    }
  }, [])

  const displayNotificationWith = (message, status='success') => {
    setNotification({ message, status })

    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password
      })

      blogService.setToken(user.token)

      window.localStorage.setItem(
        'loggedBlogappUser',
        JSON.stringify(user)
      )

      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      displayNotificationWith(exception.response.data.error, 'error')
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
    blogService.setToken(null)
  }

  const handleInputOnChange = (callback) => {
    return ({ target }) => {
      callback(target.value)
    }
  }

  const addBlog = async (blogObject) => {

    try {
      const returnedBlog = await blogService.create(blogObject)
      
      blogFormRef.current.toggleVisibility()
      displayNotificationWith(
        `a new blog ${returnedBlog.title} by ${returnedBlog.author} added`
      )
      setBlogs(blogs.concat(returnedBlog))
    } catch (exception) {
      displayNotificationWith(exception.response.data.error, 'error')
    }
  }

  const blogFormRef = useRef()

  if (user === null) {
    return (
      <>
        <h2>Log in to application</h2>
        <Notification notification={notification} />
        <LoginForm 
          username={username}
          password={password}
          handleLogin={handleLogin}
          handleUsernameChange={handleInputOnChange(setUsername)}
          handlePasswordChange={handleInputOnChange(setPassword)}
        />
      </>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification notification={notification} />
      <div>
        {user.name} logged in
        <button onClick={handleLogout}>
          logout
        </button>
      </div>

      <Togglable buttonLabel='create new blog' ref={blogFormRef}>
        <BlogForm createBlog={addBlog} />
      </Togglable>

      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App