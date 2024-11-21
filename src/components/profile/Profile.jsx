import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Ensure axios is installed via `npm install axios`

const Profile = () => {
  const [userDetails, setUserDetails] = useState({
    role: '',
    preference: '',
    email: '',
  });

  const username = localStorage.getItem('userName') || 'Guest';
  const email = localStorage.getItem('email') || 'Guest';
  const role = localStorage.getItem('role') || 'Guest';
  const preference = localStorage.getItem('preference') || 'Guest';

  useEffect(() => {
    // Fetch user details from the database
    const fetchUserDetails = async () => {
      try {
        const userId = localStorage.getItem('userID'); // Assuming `userId` is stored in localStorage
        const response = await axios.get("https://ed-tech-backend-t5i5.onrender.com/me", {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('authToken')}`,
            },
          });
          setUserDetails({
            role: response.data.user.role || '',
            preference: response.data.user.preference || '',
            email: response.data.user.email || '',
          });
      
        console.log('API Response:', response.data);  // Replace with your API URL
      } catch (error) {
        console.error('Error fetching user details:', error.message);
      }
    };

    fetchUserDetails();
  }, []);

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1>Welcome, {username}!</h1>
      </div>
      <button style={styles.followButton}>Follow</button>
      <div style={styles.details}>
        <p><strong>Role:</strong> {role}</p>
        <p><strong>Preference:</strong> {preference}</p>
        <p><strong>Email:</strong> {email}</p>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',  // Full viewport height
    width: '100%',  // Full viewport width
    textAlign: 'center',
    fontFamily: 'Arial, sans-serif',
    margin: 0,
    padding: '20px',
    boxSizing: 'border-box',  // Ensure padding does not affect overall size
  },
  header: {
    marginBottom: '20px',
  },
  followButton: {
    backgroundColor: '#2d55b2',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    padding: '10px 20px',
    fontSize: '16px',
    cursor: 'pointer',
    marginBottom: '20px',
  },
  details: {
    textAlign: 'left',
  },
};

export default Profile;
