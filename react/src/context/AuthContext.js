import { createContext, useState, useEffect } from "react";
import jwtDecode from "jwt-decode";
import {redirect } from 'react-router-dom'
import { useNavigate } from "react-router-dom";
const AuthContext = createContext()

export default AuthContext


export const AuthProvider = ({children}) => {

    
    let [authTokens, setAuthTokens] = useState(() => localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null)
    let [user, setUser] = useState(() => localStorage.getItem('authTokens') ? jwtDecode(localStorage.getItem('authTokens')) : null)

    let navigate = useNavigate ()

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
        // console.log('data', data)
        // console.log('response: ', response)
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
        event.preventDefault()
        let isPrivate
        if(event.target.private.value == "on"){
            isPrivate = true
        }
        else{
            isPrivate = false
        }
        let response= await fetch('http://localhost:8000/chatroomform/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({'title':event.target.title.value, 'description':event.target.description.value, 'private':isPrivate, 'author': user.user_id})
        }
        )
        navigate('/')
    }

    let logoutUser = () => {
        setAuthTokens(null)
        setUser(null)
        localStorage.removeItem('authTokens')
        navigate('/login')
    }


    let contextData = {
        user:user,
        loginUser:loginUser,
        logoutUser:logoutUser,
        CreateUser:CreateUser,
        CreateChatRoom:CreateChatRoom
    }

    return(
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    )
}