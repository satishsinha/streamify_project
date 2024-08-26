import React, { useState } from 'react';
import './Header.css';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="header">
      <div className="header__logo">Streamify</div>
      <div className="header__menu-icon" onClick={toggleMenu}>
        &#9776;
      </div>
      <nav className={`header__nav ${menuOpen ? 'header__nav--open' : ''}`}>
        <a href="#home" onClick={() => setMenuOpen(false)}>Home</a>
        <a href="#about" onClick={() => setMenuOpen(false)}>About</a>
        <a href="#contact" onClick={() => setMenuOpen(false)}>Contact us</a>
        <div className="header__auth">
          <button className="header__button">Sign Up</button>
          <button className="header__button header__button--signin">Sign In</button>
        </div>
      </nav>
    </header>
  );
};

export default Header;
