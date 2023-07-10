import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useEffect,useState } from "react";
import PrivateRoute from "./utils/PrivateRoot";
import HomePage from './pages/HomePage'
import { AuthProvider } from "./context/AuthContext";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import ChatRoomForm from "./pages/ChatRoomForm";
import ChatRooms from "./pages/ChatRooms";
function App() {
  let [data, setData] = useState([])
  useEffect(() => {
    fetch('http://localhost:8000/chatroomform/')
    .then(response => response.json())
    .then(data => setData(data))
    .catch(error => console.log(error))
  }, [])
  return (
    <div className="App">
      <Router>
        <AuthProvider>
          <Routes>
            
            <Route exact path='/' element={<PrivateRoute/>}>
              <Route exact  path='/' element={<HomePage />} />
            </Route>
            <Route path="/login" element={<LoginPage/>}/>
            <Route path="/signup" element={<SignupPage/>}/>
            <Route path="/chatroomcreator" element={<ChatRoomForm/>}/>
            {
            data.map((item, index)=>(
              <Route key={index} path={`/chatroom/${item.title}`}  element={<ChatRooms roomName={item.title} roomDescirption={item.description} roomAuthor={item.author} roomID={item.id} />}/>


              ))
            }
          </Routes>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
