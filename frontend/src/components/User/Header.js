// src/components/User/Header.js

import React from 'react';
import './Dashboard.css';

const Header = () => {
  return (
    <header className="dashboard__header">
      <h1>Dashboard</h1>
      <div className="dashboard__search-container">
        <input type="text" className="dashboard__search-box" placeholder="Search..." />
        <button className="dashboard__search-button">Search</button>
      </div>
    </header>
  );
};

export default Header;
