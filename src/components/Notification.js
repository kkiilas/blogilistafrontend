import React from 'react'
import { useSelector } from 'react-redux'
// import PropTypes from 'prop-types'

// const Notification = ({ message }) => {
const Notification = () => {
  const message = useSelector((state) => state.message)

  // return <>{message !== null && <div className="message">{message}</div>}</>
  return <>{message.length > 0 && <div className="message">{message}</div>}</>
}

// Notification.propTypes = {
//   message: PropTypes.string,
// }

export default Notification
