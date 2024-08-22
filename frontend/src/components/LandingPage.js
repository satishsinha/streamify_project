// src/components/LandingPage.js

import React from 'react';
import './LandingPage.css';

const LandingPage = () => {
  return (
    <div className="landing-page">
      {/* Header */}
      <header className="header">
        <div className="header__logo">Streamify</div>
        <nav className="header__nav">
          <a href="#home">Home</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
          <div className="header__auth">
            <button className="header__button">Sign Up</button>
            <button className="header__button header__button--signin">Sign In</button>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero__content">
            <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
          <h1>Welcome to Streamify</h1>
          <p>Watch your favorite shows and movies anytime, anywhere.</p>
          <button className="hero__button">Start Watching</button>
        </div>
      </section>

      {/* Featured Content */}
      <section className="featured">
        <h2>Featured Shows & Movies</h2>
        <div className="featured__carousel">
          <div className="carousel__item"><img src="/images/mid1.jpg" alt="Feature 1" /></div>
          <div className="carousel__item"><img src="/images/mid2.jpg" alt="Feature 2" /></div>
          <div className="carousel__item"><img src="/images/mid3.jpg" alt="Feature 1" /></div>
          <div className="carousel__item"><img src="/images/mid4.jpg" alt="Feature 2" /></div>
          <div className="carousel__item"><img src="/images/mid5.jpg" alt="Feature 2" /></div>
          <div className="carousel__item"><img src="/images/mid6.jpg" alt="Feature 2" /></div>
        </div>
      </section>

      {/* Popular Shows Section */}
      <section className="popular">
        <h2>Popular Shows</h2>
        <div className="popular__grid">
          <div className="grid__item"><img src="/images/lower-1.jpeg" alt="Popular 1" /></div>
          <div className="grid__item"><img src="/images/lower-2.jpg" alt="Popular 2" /></div>
          <div className="grid__item"><img src="/images/lower-3.jpg" alt="Popular 3" /></div>
          <div className="grid__item"><img src="/images/lower-4.jpg" alt="Popular 4" /></div>
          <div className="grid__item"><img src="/images/lower-5.jpg" alt="Popular 5" /></div>
          {/* Add more items as needed */}
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer__top">
          <div className="footer__links">
            <a href="#terms">Terms of Service</a>
            <a href="#privacy">Privacy Policy</a>
            <a href="#help">Help</a>
          </div>
          <div className="footer__social">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
          </div>
        </div>
        <div className="footer__bottom">
          <p>&copy; 2024 Streamify. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
