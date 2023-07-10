import React, { useEffect, useState } from "react";

function ChatRooms({ roomName, roomDescription, roomAuthor }) {
    let [data, setData] = useState([])
  
    useEffect(() => {
      fetch(`http://localhost:8000/user/${roomAuthor}/`)
        .then(response => response.json())
        .then(data => {
          setData(data.username)
        })
        .catch(error => console.log(error))
    }, [])
  

  
    return (
      <div>
        <div>Welcome to the {roomName} room</div>
        <div>{roomDescription}</div>
        <div>Author: {data}</div>
      </div>
    );
  }
  
  export default ChatRooms;
