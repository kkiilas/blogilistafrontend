import React from 'react'
import PropTypes from 'prop-types'

const LogoutForm = ({ name, handleLogout }) => {
  return (
    <div>
      {name} logged in
      <button onClick={handleLogout}>logout</button>
    </div>
  )
}

LogoutForm.propTypes = {
  name: PropTypes.string.isRequired,
  handleLogout: PropTypes.func.isRequired,
}

export default LogoutForm
