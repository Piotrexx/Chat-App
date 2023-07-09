import React, {useContext, useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import AuthContext from '../context/AuthContext'
function HomePage() {
    let {user, logoutUser} = useContext(AuthContext)
    let [data, setData] = useState([])
    useEffect(() => {
      fetch('http://localhost:8000/chatroomform/')
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => console.log(error))
    }, [])
    return (
      <div className=''>
          <Link to='/'>Home</Link>
          <span> | </span>
          
          {user ? (
            <div>
              <div>
              <Link onClick={logoutUser}>Logout</Link>
              <span> | </span>
              <Link to='/chatroomcreator'>Create new room</Link>
              </div>
            </div>

          ): (
            <Link to="/login">Login</Link>
          )}
       
  
  
          {user && <p>Hello {user.username}</p>}
          


          
          {
                data.map((item, index)=>(
                  <ul key={index}>
                    <p>Title: </p><li>
                      {item.title}
                    </li>
                    <p>Description: </p><li>
                      {item.description}
                    </li>
                    <p>Id of the author(will be changed to the username): </p><li>
                      {item.author}
                    </li>
                    <br></br>
                  </ul>

                ))
              }

      </div>
    )
}

export default HomePage