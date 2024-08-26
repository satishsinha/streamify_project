// src/components/User/Dashboard.js

import React from 'react';
import './Dashboard.css';
import SideMenu from './SideMenu';
import Header from './Header';

const Dashboard = () => {
  return (
    <div className="dashboard">
      <SideMenu />

      <main className="dashboard__content">
        <Header />

        <section className="dashboard__main">
          <div className="content__section">
            <h2>Popular Shows</h2>
            <div className="content__row">
              {/* Replace the src attribute with actual image URLs */}
              <div className="content__item">
                <img src="https://via.placeholder.com/150x200" alt="Show 1" />
                <p>Show Title 1</p>
              </div>
              <div className="content__item">
                <img src="https://via.placeholder.com/150x200" alt="Show 2" />
                <p>Show Title 2</p>
              </div>
              <div className="content__item">
                <img src="https://via.placeholder.com/150x200" alt="Show 3" />
                <p>Show Title 3</p>
              </div>
              <div className="content__item">
                <img src="https://via.placeholder.com/150x200" alt="Show 4" />
                <p>Show Title 4</p>
              </div>
              <div className="content__item">
                <img src="https://via.placeholder.com/150x200" alt="Show 5" />
                <p>Show Title 5</p>
              </div>
            </div>
          </div>
          <div className="content__section">
            <h2>Trending Now</h2>
            <div className="content__row">
              {/* Replace the src attribute with actual image URLs */}
              <div className="content__item">
                <img src="https://via.placeholder.com/150x200" alt="Trend 1" />
                <p>Trend Title 1</p>
              </div>
              <div className="content__item">
                <img src="https://via.placeholder.com/150x200" alt="Trend 2" />
                <p>Trend Title 2</p>
              </div>
              <div className="content__item">
                <img src="https://via.placeholder.com/150x200" alt="Trend 3" />
                <p>Trend Title 3</p>
              </div>
              <div className="content__item">
                <img src="https://via.placeholder.com/150x200" alt="Trend 4" />
                <p>Trend Title 4</p>
              </div>
              <div className="content__item">
                <img src="https://via.placeholder.com/150x200" alt="Trend 5" />
                <p>Trend Title 5</p>
              </div>
            </div>
          </div>
          <div className="content__section">
            <h2>My List</h2>
            <div className="content__row">
              {/* Replace the src attribute with actual image URLs */}
              <div className="content__item">
                <img src="https://via.placeholder.com/150x200" alt="List 1" />
                <p>List Title 1</p>
              </div>
              <div className="content__item">
                <img src="https://via.placeholder.com/150x200" alt="List 2" />
                <p>List Title 2</p>
              </div>
              <div className="content__item">
                <img src="https://via.placeholder.com/150x200" alt="List 3" />
                <p>List Title 3</p>
              </div>
              <div className="content__item">
                <img src="https://via.placeholder.com/150x200" alt="List 4" />
                <p>List Title 4</p>
              </div>
              <div className="content__item">
                <img src="https://via.placeholder.com/150x200" alt="List 5" />
                <p>List Title 5</p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
