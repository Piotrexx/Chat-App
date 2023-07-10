import React, {useContext, useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import AuthContext from '../context/AuthContext'
function HomePage() {
    let {user, logoutUser} = useContext(AuthContext)
    let [data, setData] = useState([])
    let [username, setUsername] = useState(null);
    useEffect(() => {
      fetch('http://localhost:8000/chatroomform/')
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => console.log(error))

    }, [])
    let FetchingAuthor = (userID) => {
      
         fetch(`http://localhost:8000/user/${userID}/`)
        .then(response => response.json())
        // .then(response => console.log(response))
        // .then(response => console.log(response.username))

        .catch(error => console.log(error))
      }
      
      // useEffect(() => {
      //   const fetchData = async () => {
      //     try {
      //       const response = await fetch('http://localhost:8000/user/1/');
      //       const data = await response.json();
      //       setUsername(data.username);
      //     } catch (error) {
      //       console.log(error);
      //     }
      //   };
    
      //   fetchData();
      // }, []);
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
                      <Link to={`chatroom/${item.title}`}>{item.title}</Link>
                    </li>
                    <p>Description: </p><li>
                      {item.description}
                    </li>
                    {/* <p>Id of the author(will be changed to the username): </p><li>
                      {FetchingAuthor(item.author)}
                    </li> */}
                    <br></br>
                  </ul>

                ))
              }

      </div>
    )
}

export default HomePage