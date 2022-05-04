import React from 'react'
import { useSelector } from 'react-redux'

const ErrorNotification = () => {
  const errorMessage = useSelector((state) => state.errorMessage)

  return (
    <>
      {errorMessage.length > 0 && <div className="error">{errorMessage}</div>}
    </>
  )
}

export default ErrorNotification
