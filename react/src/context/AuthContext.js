import { createContext, useState, useEffect } from "react";
import jwtDecode from "jwt-decode";
import {redirect } from 'react-router-dom'
import { useNavigate } from "react-router-dom";
const AuthContext = createContext()

export default AuthContext


export const AuthProvider = ({children}) => {

    
    let [authTokens, setAuthTokens] = useState(() => localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null)
    let [user, setUser] = useState(() => localStorage.getItem('authTokens') ? jwtDecode(localStorage.getItem('authTokens')) : null)
    let [usercheck, setUserCheck] = useState()
    let [friendCheck, setFriendCheck] = useState()
    let navigate = useNavigate ()
    let [friends, setFriends] = useState([])
    


    let loginUser = async (event) =>{
        event.preventDefault()
        console.log('it is working')
        let response = await fetch('http://localhost:8000/api/token/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({'username':event.target.username.value, 'password':event.target.password.value})
        })
        let data = await response.json()
        if (response.status === 200){
            setAuthTokens(data)
            setUser(jwtDecode(data.access))
            localStorage.setItem('authTokens', JSON.stringify(data))
            navigate('/')
        }
        else{
            alert('Something went wrong :(')
        }
    }
    let CreateUser = async (event) => {
        event.preventDefault()
        let response = await fetch('http://localhost:8000/user/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({'username':event.target.username.value, 'password':event.target.password.value, 'email':event.target.email.value})
        })

        navigate('/login')
    }

    let CreateChatRoom = async (event) => {
        useEffect(() => {
            fetch(`http://127.0.0.1:8000/friends/${user.user_id}/`)
            .then(response => response.json())
            .then(friends => setFriends(friends))
            .catch(error => console.log(error))
          }, [])
        event.preventDefault()
        let isPrivate
        let idTest
        let allowed = [1 ,2] // still working on that, now im going to work on friends... again
        if(event.target.private.value == "on"){
            isPrivate = true
        }
        else{
            isPrivate = false
        }
        // friends.map((item) => {

        //     if(item.id === event.target.friend && event.target.friend.value === "on") {
        //         allowed.push(item.id)
        //     }
        // })
        console.log(allowed)
        console.log(event.target.friend.key)
        let response= await fetch('http://localhost:8000/chatroomform/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({'title':event.target.title.value, 'description':event.target.description.value, 'private':isPrivate, 'author': user.user_id, 'friends_added': allowed})
        }
        )
        navigate('/')
        
    }

    let CreateMessage = async (event) =>{
        event.preventDefault()

        let response =  await fetch('http://localhost:8000/postingMessages/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({'content':event.target.content.value, 'author': user.user_id, 'chatroom': event.target.chatroom.value})
        })
        window.location.reload();
    }


    let logoutUser = () => {
        setAuthTokens(null)
        setUser(null)
        localStorage.removeItem('authTokens')
        navigate('/login')
    }


    let acceptRequest = async (friendID, requestID) => {
        let add = await fetch('http://127.0.0.1:8000/postingUserProfile/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({'user': friendID, 'friends': [user.user_id]})         
        });
        let response = await fetch('http://127.0.0.1:8000/postingUserProfile/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({'user': user.user_id, 'friends': [friendID]})         
        });
        let test = await fetch(`http://127.0.0.1:8000/postingRequests/${requestID}/`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });
            window.location.reload();
    }

    
    let declineRequest = async (requestID) => {
        let response = await fetch(`http://127.0.0.1:8000/postingRequests/${requestID}/`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
        })
        window.location.reload();
    }

    let contextData = {
        user:user,
        loginUser:loginUser,
        logoutUser:logoutUser,
        CreateUser:CreateUser,
        CreateChatRoom:CreateChatRoom,
        CreateMessage:CreateMessage,
        acceptRequest:acceptRequest,
        declineRequest:declineRequest
    }

    return(
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    )
}