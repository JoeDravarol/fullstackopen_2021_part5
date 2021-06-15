import React from 'react'

const Notification = ({ notification }) => {
  if (notification === null) return null

  return (
    <div className={`notification ${notification.status === 'error' ? 'notification-error' : ''}`}>
      {notification.message}
    </div>
  )
}

export default Notification
