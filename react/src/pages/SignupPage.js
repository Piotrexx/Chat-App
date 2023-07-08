import React, {useContext} from 'react'
import AuthContext from '../context/AuthContext'
function SignupPage() {
    let {CreateUser} = useContext(AuthContext)
    return (
    <div>
        <form onSubmit={CreateUser}>
              <input type='text' name='username' placeholder='Enter your username'/>
              <input type='email' name='email' placeholder='Enter your email'/>
              <input type='password' name='password' placeholder='Enter your password'/>
              <input type='submit'/>
        </form>
    </div>
  )
}

export default SignupPage