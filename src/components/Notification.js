import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
  const message = useSelector((state) => state.message)

  return <>{message.length > 0 && <div className="message">{message}</div>}</>
}

export default Notification
