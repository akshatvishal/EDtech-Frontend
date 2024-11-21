import React, { useState } from "react";
import "./Navbar.css";

function DropdownSelector() {
  const [selectedOption, setSelectedOption] = useState(""); // State to hold the selected value
  const [newPost, setnewPost] = useState(false); // State to hold the selected value

  const handleChange = (event) => {
    setSelectedOption(event.target.value); // Update state with selected value
    console.log("Selected Option:", event.target.value); // Debug
  };
  const handlePost=()=>{
    setnewPost
  }



  return (
    <div className="Nav">
      <h2>Select an Option</h2>
      <div className="dropdown">
        <select value={selectedOption} onChange={handleChange}>
          <option value="">-- Please Choose --</option>
          <option value="jee">JEE</option>
          <option value="neet">NEET</option>
          <option value="upsc">UPSC</option>
        </select>
        <select className="new" value={newPost} onChange={handlePost} >
          <option value="">-- Please Choose --</option>
          <option value="jee">JEE</option>
          <option value="neet">NEET</option>
          <option value="upsc">UPSC</option>
        </select>
      </div>
      <p>You selected: {selectedOption}</p>
    </div>
  );
}

export default DropdownSelector;
