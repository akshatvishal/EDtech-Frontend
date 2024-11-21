import React, { useState } from "react";
import axios from "axios";
import Modal from "react-modal"; // For modal
import './Chatbot.css'; // Add your custom CSS for styles
import ai from '../Chatbot/assests/gpt.png'

// Set the app element for modal (important for accessibility)
Modal.setAppElement('#root');

const Chatbot = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userMessage, setUserMessage] = useState("");
  const [botResponse, setBotResponse] = useState("");
  
  // Function to open the chatbox
  const openChatbox = () => {
    setIsModalOpen(true);
  };

  // Function to close the chatbox
  const closeChatbox = () => {
    setIsModalOpen(false);
  };

  // Handle sending a message to the Gemini API
  const sendMessage = async () => {
    if (userMessage.trim() !== "") {
      try {
        // API Request Payload
        const payload = {
          contents: [
            {
              parts: [
                { text: userMessage } // Send user message as part of the payload
              ]
            }
          ]
        };
  
        // API Request
        const response = await axios.post(
          "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=AIzaSyDm1y_Pjd_SGWoZ0kkyVta8tcsnPjFFCiE",
          payload
        );
  
        // Extract the bot's response from the API response structure
        const responseText =
          response.data.candidates?.[0]?.content?.parts?.[0]?.text || "No response available.";
        
        // Update state with the bot's response
        setBotResponse(responseText);
        setUserMessage(""); // Clear the input field
      } catch (error) {
        console.error("Error fetching Gemini response:", error.response?.data || error.message);
        setBotResponse("Sorry, I couldn't get an answer. Try again!");
      }
    }
  };
  

  return (
    <div>
      {/* Chatbot Icon/Image */}
      <img 
        src={ai} // Path to your chatbot image/icon
        alt="Chatbot"
        className="chatbot-icon"
        onClick={openChatbox}
      />

      {/* Chatbot Modal/Dialog Box */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeChatbox}
        contentLabel="Chatbot Dialog"
        className="chatbot-modal"
        overlayClassName="chatbot-overlay"
      >
        <div className="chatbot-header">
          <h3>Chat with us!</h3>
          <button className="close-btn" onClick={closeChatbox}>X</button>
        </div>
        <div className="chatbot-body">
          <div className="chat-box">
            <div className="bot-response">
              {botResponse && <p><strong>Bot:</strong> {botResponse}</p>}
            </div>
            <div className="user-message">
              <input
                type="text"
                value={userMessage}
                onChange={(e) => setUserMessage(e.target.value)}
                placeholder="Ask something..."
              />
              <button onClick={sendMessage}>Send</button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Chatbot;
