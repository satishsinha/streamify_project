// src/components/Admin/Header.js

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; 
import './AdminDashboard.css';
import { getUserSession } from '../utils/authUtils'; // Import the logout function

const Header = () => {
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const userSession = getUserSession(); // Get user session

    if (userSession && userSession.given_name) {
        setUserName(userSession.given_name);
    } else {
        // Redirect to login if no session
        console.warn("No valid session found, redirecting to login.");
        window.location.href = "/";
    }
  }, []);
  return (
    <header className="dashboard__header">
      <h1>Welcome {userName}</h1>
      <div className="dashboard__actions">
        <Link to="/upload"><button className="dashboard__button">Upload Video</button></Link>
        <button className="dashboard__button">Settings</button>
        </div>
    </header>
  );
};

export default Header;
