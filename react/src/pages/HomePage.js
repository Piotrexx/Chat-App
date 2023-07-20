import React, {useContext, useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import AuthContext from '../context/AuthContext'

function HomePage() {
    let {user, logoutUser, acceptRequest, declineRequest} = useContext(AuthContext)
    let [data, setData] = useState([])
    let [username, setUsername] = useState([])
    let [searchInput, setSearchInput] = useState('')
    let  [filteredResults, setFilteredResults] = useState([])
    let [friendRequest, setFriendRequest] = useState([])
    let [friends, setFriends] = useState([])

    let correctRequests = []
    let realFriends = []

  useEffect(() =>{
    fetch('http://127.0.0.1:8000/friendrequest/')
    .then(response => response.json())
    .then(friendRequest => setFriendRequest(friendRequest))
    .catch(error => console.log(error))
  }, [])

  
  friendRequest.map((item) =>{
    if(item.receiver !== user.user_id){
      return 0
    }
    else{
      correctRequests.push(item)
    }
  })

  useEffect(() =>{
    fetch('http://127.0.0.1:8000/userprofile/')
    .then(response => response.json())
    .then(friends => setFriends(friends))
    .catch(error => console.log(error))
  }, [])

  friends.map((item)=> {
    if(item.user || item.friends === user.user_id){
      realFriends.push(item)
    }
  })

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
      let ConvertingNames = (ID) =>{
        fetch(`http://localhost:8000/user/${ID}/`)
        .then((response) => response.json())
          .then((username) => {
            setUsername(username.username) 
          })
          .catch((error) => console.log(error))
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
                {
               correctRequests.map((item, index) => {
                    return (
                      <p key={index}>
                        Friend Request from
                        {item.sender}
                        
                        <button onClick={() => acceptRequest(item.sender, item.id)}>ACCEPT</button><span> | </span> <button onClick={() => declineRequest(item.id)}>DECLINE</button>
                      </p>
                    )
                  })
                }

                {
                  realFriends.map((item, index) =>{
                    return(
                      <p key={index}>
                        {item.friends}
                      </p>
                    )
                  })
                }
                    

      </div>
    )
}

export default HomePage