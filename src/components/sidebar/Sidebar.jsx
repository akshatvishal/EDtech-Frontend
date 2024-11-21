import React, { useContext, useEffect, useState } from "react";
import peerly from "./assets/Peerly.png";
import "./Sidebar.css";
import { Datacontext, fieldcontext } from "../../Context/userContext";
import { useNavigate } from "react-router-dom";
import button from './assets/send button.png'

function Sidebar() {
  const { setfield } = useContext(fieldcontext);
  const { userName, setName } = useContext(Datacontext);
  const [userId, setuserId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUserId = localStorage.getItem("userID");
    const storedUserName = localStorage.getItem("userName"); // Retrieve userName as well

    if (storedUserId && storedUserName) {
      try {
        setuserId(JSON.parse(storedUserId));
        setName(storedUserName); // Update the Datacontext with userName
        console.log("User loaded from localStorage:", storedUserId, storedUserName);
      } catch (error) {
        console.error("Error loading user data from localStorage:", error);
      }
    } else {
      console.warn("No user data found in localStorage");
    }
  }, [setName]);

  // Generic navigation handler
  const handleNavigation = (route, field) => {
    setfield(field); // Update the field context
    navigate(route); // Navigate to the specified route
    console.log(field);
  };

  return (
    <div className="sidebar">
      {/* Logo */}
      <img src={peerly} alt="Peerly Logo" className="sidebar-logo" />

      {/* Channels Section */}
      <div className="channels">
        <div
          className="channel"
          onClick={() => handleNavigation("/Jee", "jee")}
        >
          JEE
        </div>
        <div
          className="channel"
          onClick={() => handleNavigation("/Neet", "neet")}
        >
          Neet
        </div>
        <div
          className="channel"
          onClick={() => handleNavigation("/Upsc", "upsc")}
        >
          Upsc
        </div>
      </div>

      {/* Community Section */}
      <div className="channel" onClick={()=>handleNavigation("/Community","community")}>Community</div>
      <div className="profile" onClick={()=>handleNavigation("/profile","profile")}>
        <span className="pfp">
          {userName ? `Hello, ${userName}` : "Welcome, Guest"}
          <img src={button} className="lets-go"></img>

          </span>
        
      </div>
    </div>
  );
}

export default Sidebar;
