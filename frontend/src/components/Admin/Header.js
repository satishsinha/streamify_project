// src/components/Admin/Header.js

import React from 'react';
import './AdminDashboard.css';

const Header = () => {
  return (
    <header className="dashboard__header">
      <h1>Dashboard</h1>
      <div className="dashboard__actions">
        <button className="dashboard__button">Upload Video</button>
        <button className="dashboard__button">Settings</button>
        </div>
    </header>
  );
};

export default Header;
