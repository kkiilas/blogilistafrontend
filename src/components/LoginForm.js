import React from 'react'
import { useDispatch } from 'react-redux'
import { useField } from '../hooks/index'
import { createCredentials } from '../reducers/userReducer'

const LoginForm = () => {
  const dispatch = useDispatch()
  const { reset: resetUsername, ...username } = useField('username', 'text')
  const { reset: resetPassword, ...password } = useField('password', 'password')

  const handleLogin = (event) => {
    event.preventDefault()
    const user = {
      username: username.value,
      password: password.value
    }
    resetUsername()
    resetPassword()
    dispatch(createCredentials(user))
  }

  return (
    <div>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input {...username} />
        </div>
        <div>
          password
          <input {...password} />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )
}

export default LoginForm
