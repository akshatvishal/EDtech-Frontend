import { useState } from "react";
import SignInUpForm from "../src/components/sign/sign";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation
} from "react-router-dom";
import "./App.css";
import Sidebar from "./components/Sidebar/Sidebar";
import Home from "./components/Home/Home";
import { DataProvider ,FieldProvider } from "./Context/userContext";
import Jee from "./components/jee/Jee";
import Neet from "./components/Neet/Neet";
import Upsc from "./components/Upsc/Upsc";
import Community from "./components/community/Community";
import Profile from "./components/profile/Profile"; 
import Chatbot from "./components/Chatbot/Chatbot.jsx";



function AppContent() {
  const location = useLocation();
  const [userName,setName]=useState('');

  return (
    <>
    <FieldProvider>
    <DataProvider className='body'>
    <div className="app-container">
          {/* Sidebar */}
          {location.pathname !== "/" && <Sidebar userName={userName} />}
          {/* Content Section */}
          <div className="content">
            <Routes>
              <Route path="/" element={<SignInUpForm setUserName={setName} />} />
              <Route path="/Home" element={<Home />} />
              <Route path="/Jee" element={<Jee />} />
              <Route path="/Neet" element={<Neet />} />
              <Route path="/Upsc" element={<Upsc />} />
              <Route path="/Community" element={<Community />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </div>
        </div>
        {<Chatbot />}
    </DataProvider>
    </FieldProvider>
    
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
