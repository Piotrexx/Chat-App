import React, {useContext, useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import AuthContext from '../context/AuthContext'

function HomePage() {
    let {user, logoutUser} = useContext(AuthContext)
    let [data, setData] = useState([])
    let [username, setUsername] = useState([])
    let [searchInput, setSearchInput] = useState('')
    let  [filteredResults, setFilteredResults] = useState([])
    useEffect(() => {
      fetch('http://localhost:8000/chatroomform/')
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => console.log(error))

    }, [])

      useEffect(() => {
        fetch('http://localhost:8000/user/')
        .then(response => response.json())
        .then(username => setUsername(username))
        .catch(error => console.log(error))
      }, [])

      let SearchItems = (searchValue) => {
        setSearchInput(searchValue)
        if(searchInput !== ''){
          const filteredData = username.filter((item) => {
            return Object.values(item).join('').toLowerCase().includes(searchInput.toLowerCase())
          })
          setFilteredResults(filteredData)
        }
        else{
          setFilteredResults(username)

        }
      }

      let HandleRequest = async (receiver) =>{
        let response = await fetch('http://127.0.0.1:8000/friendrequest/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({'status': 'pending','sender': user.user_id, 'receiver': receiver})
          
        })

      }
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

                    <br></br>
                  </ul>

                ))
              }

            <h3>Search users: </h3>
            <form>
              <input type='text' name='usersearch' placeholder='Type searching query' onChange={(e) => SearchItems(e.target.value)}/>
            </form>
             
                {searchInput.length > 1 ? (
                    filteredResults.map((item, index) => {
                    return(
                      <p key={index}>
                      {item.username} <span><button onClick={() => HandleRequest(item.id)}>ADD FRIEND</button></span>
                    </p>
                    )

                    })
                ) : (
                    username.map((item, index) => {
                        return (
                            <p key={index}>
                              {item.username} <span><button onClick={() => HandleRequest(item.id)}>ADD FRIEND</button></span>
                            </p>
                        )
                    })
                )}
      </div>
    )
}

export default HomePage