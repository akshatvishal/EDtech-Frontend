import React, { useState } from "react";
import "./Navbar.css";

function Community() {
  const [selectedOption, setSelectedOption] = useState(""); // State for the selected value
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility
  const owner = JSON.parse(localStorage.getItem("userID"));
  const userName= localStorage.getItem("userName");
  const createdAt = new Date().toISOString();  // Current time in ISO format
  const [postDetails, setPostDetails] = useState({
    caption: "",
    owner,
    tags: [], 

  }); // State for post details

  // Create Post function for sending data to the backend
  const createPost = async (postDetails) => {
    try {
      const response = await fetch(
        "https://ed-tech-backend-t5i5.onrender.com/posts",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(postDetails),
        }
      );

      if (response.ok) {
        console.log("Post created successfully");
      } else {
        console.log(postDetails);
        console.error("Failed to create post:", await response.text());
      }
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  const handleChange = (event) => {
    setSelectedOption(event.target.value); // Update state with selected value
    console.log("Selected Option:", event.target.value); // Debug
  };

  const handlePost = () => {
    setIsModalOpen(true); // Open the modal when a new post option is selected
  };

  const handleModalSubmit = (event) => {
    event.preventDefault();
    // Call the createPost function with the postDetails
    createPost(postDetails);
    setSelectedOption("");
    setPostDetails({
      caption: "",
      tags: [], // Reset tags to an empty array
    });
    setIsModalOpen(false); // Close the modal after submitting
  };

  const handleModalClose = () => {
    setIsModalOpen(false); // Close the modal without saving
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    // If the field is 'tags', prepend '#' to the selected value and store as an array
    if (name === "tags" && value) {
      setPostDetails((prevDetails) => ({
        ...prevDetails,
        [name]: [`#${value}`], // Store tags as an array
      }));
    } else {
      setPostDetails((prevDetails) => ({
        ...prevDetails,
        [name]: value,
      }));
    }
  };

  return (
    <div className="Nav">
      <h2>Select an Option</h2>
      <div className="dropdown">
        <select value={selectedOption} onChange={handleChange}>
          <option value="">-- Please Choose --</option>
          <option value="JEE">JEE</option>
          <option value="NEET">NEET</option>
          <option value="UPSC">UPSC</option>
        </select>
        <div className="new" onClick={handlePost}>
          New Post
        </div>
      </div>
      <p>You selected: {selectedOption}</p>

      {/* Modal for creating a new post */}
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2>Create New Post</h2>
            <form onSubmit={handleModalSubmit}>
              <div>
                <label htmlFor="caption">Description:</label>
                <textarea
                  id="caption"
                  name="caption"
                  value={postDetails.caption}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <label htmlFor="tags">Tags:</label>
                <select
                  id="tags"
                  name="tags"
                  value={postDetails.tags[0] ? postDetails.tags[0].replace("#", "") : ""} // Remove the '#' for display
                  onChange={handleInputChange}
                  required
                >
                  <option value="">-- Select Category --</option>
                  <option value="JEE">JEE</option>
                  <option value="NEET">NEET</option>
                  <option value="UPSC">UPSC</option>
                </select>
              </div>
              <div>
                <button type="submit">Submit Post</button>
                <button type="button" onClick={handleModalClose}>
                  Close
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Community;
