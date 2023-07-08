import React, {useContext}from 'react'
import AuthContext from '../context/AuthContext'
import { Link } from 'react-router-dom'
function LoginPage() {
    let {loginUser} = useContext(AuthContext)
    return (
      <div>
          <form onSubmit={loginUser}>
              <input className='border-2 rounded'type='text' name='username' placeholder='Enter your username'/>
              <input className='border-2 rounded' type='password' name='password' placeholder='Enter your password'/>
              <input className='border-2 rounded bg-rose-500 'type='submit'/>
          </form>
            <Link to='/signup'>Don't have an account ? SIGN UP !</Link>
      </div>
    )
}

export default LoginPage