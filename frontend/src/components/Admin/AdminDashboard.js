// src/components/Dashboard.js

import React, { useEffect, useState } from 'react';
import './AdminDashboard.css';
import SideMenu from './SideMenu';
import Header from './Header';
import { getUserSession } from '../utils/authUtils'; // Import session handling function

const AdminDashboard = () => {
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
    <div className="dashboard">
      <SideMenu />

      <main className="dashboard__content">
        <Header />

        <section className="dashboard__main">
          <div className="content__section">
            <h2>Statistics</h2>
            <p>Track your viewership, engagement, and more.</p>
          </div>
          <div className="content__section">
            <h2>Recent Uploads</h2>
            <p>View and manage your recently uploaded content.</p>
          </div>
          <div className="content__section">
            <h2>User Feedback</h2>
            <p>See what users are saying about your videos.</p>
          </div>
        </section>
      </main>
    </div>
  );
};

export default AdminDashboard;
