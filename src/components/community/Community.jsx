import React, { useState } from "react";
import Post from "./Post";
import "./Navbar.css";

function Community() {
  const [selectedOption, setSelectedOption] = useState(""); // State for the selected value
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility
  const owner = localStorage.getItem("userID");
  const [postDetails, setPostDetails] = useState({
    caption: "",
    owner,
    tags: [],
  }); // State for post details

  // Create Post function for sending data to the backend
  const createPost = async (postDetails) => {
    try {
      const response = await fetch(
        "https://ed-tech-backend-t5i5.onrender.com/posts/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include", // Include cookies in the request
          body: JSON.stringify(postDetails),
        }
      );

      if (response.ok) {
        console.log("Post created successfully");
      } else {
        const errorText = await response.text();
        console.error("Failed to create post:", errorText);
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

    if (name === "tags" && value) {
      // If the field is 'tags', prepend '#' to the selected value and store as an array
      setPostDetails((prevDetails) => ({
        ...prevDetails,
        [name]: [`#${value}`],
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
                  value={
                    postDetails.tags[0]
                      ? postDetails.tags[0].replace("#", "")
                      : ""
                  } // Remove the '#' for display
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
     <Post inside="This is the first dynamic post content!" />
     <Post inside="Here's another message for the Preely community! 💡" />
     <Post inside="Got a tough question? Peerly's got the answers! Dive into a pool of shared knowledge and solve your doubts effortlessly. 🧠💡" />
     <Post inside="From math equations to science projects, Peerly is your go-to homework buddy. Start learning smarter today! 🚀📚" />

    </div>
  );
}

export default Community;
