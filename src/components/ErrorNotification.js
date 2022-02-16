import React from 'react'
import PropTypes from 'prop-types'

const ErrorNotification = ({ errorMessage }) => {
  return (
    <>
      {errorMessage !== null &&
        <div className='error'>
          {errorMessage}
        </div>
      }
    </>
  )
}

ErrorNotification.propTypes = {
  errorMessage: PropTypes.string
}

export default ErrorNotification
