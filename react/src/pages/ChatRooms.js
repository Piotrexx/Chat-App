import React, { useEffect, useState, useContext } from "react" 
import AuthContext from "../context/AuthContext" 
function ChatRooms({ roomName, roomDescription, roomAuthor, roomID }) {
  let [data, setData] = useState([]) 
  let [username, setUsername] = useState([])
  let { CreateMessage } = useContext(AuthContext) 
  let [message, setMessages] = useState([])
  let correctMessages = []
  useEffect(() => {
    fetch(`http://localhost:8000/user/${roomAuthor}/`)
      .then((response) => response.json())
      .then((data) => {
        setData(data.username) 
      })
      .catch((error) => console.log(error)) 
  }, []) 
  useEffect(() =>{
    fetch('http://localhost:8000/message/')
    .then((response) => response.json())
    .then((message) => setMessages(message))
    .catch(error => console.log(error))
  }, [])

  // console.log(message)
  console.log(data)


  // const options = {
  //   year: "numeric",
  //   month: "long",
  //   day: "numeric",
  //   hour: "numeric",
  //   minute: "numeric",
  //   second: "numeric",
  //   timeZoneName: "short",
  // }

  // function formatDate(date) {
  //   const dateTime = new Date(date);
  //   return dateTime.toLocaleString(undefined, options);
  // }

  let ConvertingNames = (ID) =>{
    fetch(`http://localhost:8000/user/${ID}/`)
    .then((response) => response.json())
      .then((username) => {
        setUsername(username.username) 
      })
      .catch((error) => console.log(error))
  }

ConvertingNames(2)

  message.map((item) =>{
    if(item.chatroom !== roomID){
      console.log('nope')
    }
    else{
      correctMessages.push(item)
    }
  })
// console.log(correctMessages)

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
        correctMessages.map((item, index) => {
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
