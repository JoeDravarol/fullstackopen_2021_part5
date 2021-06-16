import React from 'react'

const loginForm = ({
  username,
  password,
  handleLogin,
  handleUsernameChange,
  handlePasswordChange
}) => {
  return (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          id='username'
          type='text'
          value={username}
          name='Username'
          onChange={handleUsernameChange}
        />
      </div>
      <div>
        password
        <input
          id='password'
          type='password'
          value={password}
          name='Password'
          onChange={handlePasswordChange}
        />
      </div>

      <button type='submit'>login</button>
    </form>
  )
}

export default loginForm
