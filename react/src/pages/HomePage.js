import React, {useContext} from 'react'
import { Link } from 'react-router-dom'
import AuthContext from '../context/AuthContext'
function HomePage() {
    let {user, logoutUser} = useContext(AuthContext)
    return (
      <div className=''>
          <Link to='/'>Home</Link>
          <span> | </span>
          
          {user ? (
            <div>
              <Link onClick={logoutUser}>Logout</Link>
              <span> | </span>
              <Link to='/chatroomcreator'>Create new room</Link>
            </div>

          ): (
            <Link to="/login">Login</Link>
          )}
       
  
  
          {user && <p>Hello {user.username}</p>}
          
      </div>
    )
}

export default HomePage