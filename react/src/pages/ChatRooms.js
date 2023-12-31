import React, { useEffect, useState, useContext } from "react" 
import AuthContext from "../context/AuthContext" 
function ChatRooms({ roomName, roomDescription, roomAuthor, roomID }) {
  let [data, setData] = useState([]) 
  let [username, setUsername] = useState([])
  let { CreateMessage } = useContext(AuthContext) 
  let [message, setMessages] = useState([])

  useEffect(() => {
    fetch(`http://localhost:8000/user/${roomAuthor}/`)
      .then((response) => response.json())
      .then((data) => {
        setData(data.username) 
      })
      .catch((error) => console.log(error)) 
  }, []) 


  useEffect(() =>{
    fetch(`http://127.0.0.1:8000/messages/${roomID}/`)
    .then((response) => response.json())
    .then((message) => setMessages(message))
    .catch(error => console.log(error))
  }, [])


  return (
    <div>
      <div>Welcome to the {roomName} room</div>
      <div>{roomDescription}</div>
      <div>Author: {data}</div>
      <form onSubmit={(event) => CreateMessage(event)}>
        <input type="text" name="content" placeholder="Enter message content" />
        <input type="hidden" name="chatroom" value={roomID}/>
        <input type="submit" />
      </form>
      <div>
      {
        message.map((item, index) => {
          return (
            <ul key={index}>
              <span>{item.author} | </span><li>{item.content}</li>
            </ul>
          )
        })
      }
      </div>
    </div>
  ) 
}

export default ChatRooms 
