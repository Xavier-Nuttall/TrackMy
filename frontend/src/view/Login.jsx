import React from "react";
import '../App.css';
import { useMainContent, useMenuOpen, useFloor } from './CustomHooks';
import { Link } from 'react-router-dom';


function LoginPage() {
  const [menuOpen, setMenuOpen] = useMenuOpen(true); // Set default menu open state to true

  const toggleFilter = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className={`content-container${menuOpen ? '2' : '1'}`}>
      <div id="title">
        <div id="menu" onClick={toggleFilter}>
          <div id="menu-button" className={`menu-button ${menuOpen ? 'change' : ''}`} >
            <div className="bar1"></div>
            <div className="bar2"></div>
            <div className="bar3"></div>
          </div>
        </div>
        <h1>TrackMy</h1>
        {/* <div className="search-button" onClick={toggleSearch}>
            <span className="icon"></span>
          </div> */}
      </div>
      <nav className={`nav ${menuOpen ? 'open' : ''}`}>
        <Link to="/" className="sidebar-button">Home</Link>
        <Link to="/about" className="sidebar-button">About Us</Link>
        <Link to="/login" className="sidebar-button">Log In | Register</Link>
        <Link to="/account" className="sidebar-button">Account Settings</Link>
        <Link to="/notifications" className="sidebar-button">Edit Notifications</Link>
        <Link to="/room-information" className="sidebar-button">Room Information</Link>
      </nav>
      <main>
        <div className="grid-contain">
          <div id="login-panel">
            <fieldset>
              <legend>Log In</legend>
              <form>
                <label>User:</label><input type="text" name="user" />
                <label>Pass:</label><input type="password" name="pass" />
                <input type="submit" value="Sign In" />
              </form>
            </fieldset>
          </div>
          <div id="register-panel">
            <fieldset>
              <legend>Register for a New Account</legend>
              <form>
                <label>Email:</label><input type="email" name="email" />
                <label>User:</label><input type="text" name="user" />
                <label>First Name:</label><input type="text" name="firstName" />
                <label>Last Name:</label><input type="text" name="lastName" />
                <label>Other Names:</label><input type="text" name="otherNames" />
                <label>Pass:</label><input type="password" name="pass" />
                <input type="submit" value="Sign Up" />
              </form>
            </fieldset>
          </div>
        </div>
      </main>
    </div>
  );
}

export default LoginPage;