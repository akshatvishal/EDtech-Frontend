import React, { useEffect, useState } from "react";
import "../jee/jee.css";
import { useNavigate } from "react-router-dom";
import { Datacontext } from "../../Context/userContext";
import { useContext } from "react";
import { fieldcontext } from "../../Context/userContext";

function Jee() {
  const [chatInput, setChatInput] = useState("");
  const [messages, setMessages] = useState([]); // Renamed to plural 'messages' for clarity
  const [userId, setUserId] = useState(null);
  const { userName } = useContext(Datacontext);
  const { field } = useContext(fieldcontext);

  // Get the userId from localStorage on component mount
  useEffect(() => {
    const storedUserId = localStorage.getItem("userID");
    if (storedUserId) {
      setUserId(JSON.parse(storedUserId));
    }
  }, []);

  // Fetch existing messages from the backend
  useEffect(() => {
    const fetchMessages = async () => {
      if (!userId) {
        console.log("User ID is not available.");
        return;
      }

      try {
        const response = await fetch(`https://ed-tech-backend-t5i5.onrender.com/api/messages/${field}`);
        const data = await response.json();
        console.log("Fetched data:", data);

        if (data.success && Array.isArray(data.messages)) {
          setMessages(data.messages);  // Corrected from data.message to data.messages
        } else {
          console.error("Unexpected API response structure:", data);
        }
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

  fetchMessages();
}, [userId,field]);  // Re-run when userId changes



  // Send a single chat message to the backend
  const sendChat = async () => {
    if (chatInput.trim() !== "") {
      const newMessage = {
        userId,         // The user's ID
        userName,       // The user's name
        message: chatInput, // The current chat input
        field,          // The context field
      };

      try {
        const response = await fetch("https://ed-tech-backend-t5i5.onrender.com/api/messages", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newMessage),
        });

        if (response.ok) {
          // Add the new message directly to the local state
          setMessages((prevMessages) => [...prevMessages, newMessage]);

          // Clear the input field
          setChatInput("");
        } else {
          console.error("Failed to send message:", await response.text());
        }
      } catch (error) {
        console.error("Error sending message:", error);
      }
    }
  };

  return (  
    <div>
      <div className="Message-box">
        <h1>{field}</h1>

        <div className="messaging">
          <div className="chat-messages">
            {messages.map((message, index) => (
              <div className={`chats ${message.userId === userId ? "right" : "left"}`} key={index}>
                <div className="username">{message.userName}</div>
                <div className="message">{message.message}</div>
              </div>
            ))}
          </div>
          <div className="texting">
            <input
              className="chat"
              type="text"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
            />
            <button
              className="send"
              onClick={sendChat}
              tabIndex="0" // Make the button focusable
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Jee;
