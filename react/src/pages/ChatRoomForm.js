import React, {useContext, useState, useEffect} from 'react'
import AuthContext from '../context/AuthContext'
function ChatRoomForm() {
    let {CreateChatRoom, user} = useContext(AuthContext)
    const [toggle, setToggle] = useState(false)
    let [friends, setFriends] = useState([])
    useEffect(() => {
      fetch(`http://127.0.0.1:8000/friends/${user.user_id}/`)
      .then(response => response.json())
      .then(friends => setFriends(friends))
      .catch(error => console.log(error))
    }, [])

  return (
    <div>
        <form onSubmit={CreateChatRoom}>
            <input type='text' name='title' placeholder='Enter room title'/>
            <input type='text' name='description' placeholder='Enter room description'/>
            <span>Private: </span><input type='checkbox' name='private' onClick={() => setToggle(!toggle)}/>
            <input type='submit' />
            {
              toggle && friends.map((item) => {
                return (
                  <ul>
                    <input type="checkbox" id={item.id} name='friend'value={item.friends[0]} />
                    <label htmlFor={item.id}>{item.friends[0]}</label>
                  </ul>
                );
              })
              
            }
        </form>
    </div>
  )
}

export default ChatRoomForm