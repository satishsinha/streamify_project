// src/components/User/Header.js

import React, { useEffect, useState } from 'react';
import './Dashboard.css';

const Header = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // State for loading

  useEffect(() => {
    const userData = sessionStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
    setLoading(false); // Set loading to false after fetching user data
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Show loading indicator
  }
  return (
    <header className="dashboard__header">
      <h1>Welcome, {user ? user.given_name : "User"} </h1>
      <div className="dashboard__search-container">
        <input type="text" className="dashboard__search-box" placeholder="Search..." />
        <button className="dashboard__search-button">Search</button>
      </div>
    </header>
  );
};

export default Header;
