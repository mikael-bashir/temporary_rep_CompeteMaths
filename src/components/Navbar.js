import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useGlobalState, tokenValid } from '../hooks/GlobalStateContext.js';

function Navbar() {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const { token, setToken, isTokenValid, setIsTokenValid } = useGlobalState();

  // Effect to handle token validity and update state


  const logout = () => {
    localStorage.setItem('token', null);
    localStorage.removeItem('loggedIn');
    setToken(null);
    setIsTokenValid(false);
    console.log('logged out? ', token);
    console.log('logged out? ', localStorage.getItem('token'));
  };
  

  useEffect(() => {
    const sideMenu = document.querySelector('.menuBar');

    const openMenu = () => {
      if (sideMenu) sideMenu.style.transform = 'translateX(0rem)';
    };
    const closeMenu = () => {
      if (sideMenu) sideMenu.style.transform = 'translateX(13rem)';
    };

    const hamburger = document.getElementById('hamburger');
    if (hamburger) hamburger.addEventListener('click', openMenu);

    const cross = document.getElementById('cross');
    if (cross) cross.addEventListener('click', closeMenu);

    return () => {
      if (hamburger) hamburger.removeEventListener('click', openMenu);
      if (cross) cross.removeEventListener('click', closeMenu);
    };
  }, []);

  useEffect(() => {
    const navAdjuster = () => {
      const sideMenu = document.querySelector('.menuBar');
      if (window.innerWidth > 700) {
        if (sideMenu) sideMenu.style.display = 'none';
      } else {
        if (sideMenu) sideMenu.style.display = 'block';
      }
    };

    navAdjuster();
    window.addEventListener('resize', navAdjuster);

    return () => {
      window.removeEventListener('resize', navAdjuster);
    };
  }, []);

  return (
    <>
      <div className="navWrapper">
        <nav className="homeNav">
          <ul className="homeNavList">
            <li><Link id="about" to="/">About</Link></li>
            <li><Link id="archives" to="/archives">Archives</Link></li>
            <li><Link id="register" to="/register">Register</Link></li>
            <li><Link id="login" to="/login">Login</Link></li>
            <li><Link id="global" to="/global">Global</Link></li>
            <li><Link id="news" to="/news">News</Link></li>
            {isTokenValid && (
              <li><Link id="logoutButton" to="/login" onClick={logout}>Logout</Link></li>
            )}
            <li><img id="hamburger" src="/images/Screenshot_2024-08-28_at_10.50.20-removebg-preview.png" alt="" /></li>
          </ul>
        </nav>
        <div id="menuBar" className={`menuBar ${isMenuOpen ? 'open' : ''}`}>
          <img id="cross" src="/images/Screenshot_2024-08-28_at_14.39.28-removebg-preview.png" alt="" />
          <ul className="menuBarList">
            <li><Link id="menuAbout" to="/">About</Link></li>
            <li><Link id="menuArchives" to="/archives">Archives</Link></li>
            <li><Link id="menuRegister" to="/register">Register</Link></li>
            <li><Link id="menuLogin" to="/login">Login</Link></li>
            <li><Link id="menuGlobal" to="/global">Global</Link></li>
            <li><Link id="menuNews" to="/news">News</Link></li>
            {isTokenValid && (
              <li><Link id="menuLogoutButton" to="/login" onClick={logout}>Logout</Link></li>
            )}
          </ul>
        </div>
      </div>
    </>
  );
}

export default Navbar;
