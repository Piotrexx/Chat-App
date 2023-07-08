import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PrivateRoute from "./utils/PrivateRoot";
import HomePage from './pages/HomePage'
import { AuthProvider } from "./context/AuthContext";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
function App() {
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

          </Routes>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
