import React, {useContext} from 'react'
import AuthContext from '../context/AuthContext'
function ChatRoomForm() {
    let {CreateChatRoom} = useContext(AuthContext)
  return (
    <div>
        <form onSubmit={CreateChatRoom}>
            <input type='text' name='title' placeholder='Enter room title'/>
            <input type='text' name='description' placeholder='Enter room description'/>
            <span>Private: </span><input type='checkbox' name='private'/>
            <input type='submit'/>
        </form>
    </div>
  )
}

export default ChatRoomForm