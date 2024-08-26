// src/components/Dashboard.js

import React from 'react';
import './AdminDashboard.css';
import SideMenu from './SideMenu';
import Header from './Header';

const AdminDashboard = () => {
  return (
    <div className="dashboard">
      <SideMenu />

      <main className="dashboard__content">
        <Header />

        <section className="dashboard__main">
          {/* Replace the content below with your actual content */}
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
