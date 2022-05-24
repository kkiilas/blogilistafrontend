import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { clearCredentials } from '../reducers/userReducer'

const LogoutForm = () => {
  const dispatch = useDispatch()
  const name = useSelector((state) => state.user.name)

  const handleLogout = (event) => {
    event.preventDefault()
    dispatch(clearCredentials())
  }

  return (
    <div>
      {name} logged in
      <button onClick={handleLogout}>logout</button>
    </div>
  )
}

export default LogoutForm
