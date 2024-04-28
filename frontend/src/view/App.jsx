import React, { useState } from 'react';
import '../App.css';
import HomePage from './home'
import AboutUsPage from './AboutUs';
import LoginPage from './Login';
import AccountPage from './AccountPage';
import NotifPage from './NotifPage';
import RoomInformationPage from './RoomInformationPage';

function App() {
  const [mainContent, setMainContent] = useState(HomePage);
  const [menuOpen, setMenuOpen] = useState(true);

  const toggleFilter = () => {
    setMenuOpen(!menuOpen);
  };

  const handleMainPageClick = () => {
    setMainContent(HomePage);
  }

  const handleAboutUsPageClick = () => {
    setMainContent(AboutUsPage);
  }

  const handleLoginPageClick = () => {
    setMainContent(LoginPage);
  }

  const handleAccountSettingsPageClick = () => {
    setMainContent(AccountPage);
  }

  const handleNotifPageClick = () => {
    setMainContent(NotifPage);
  }

  const handleRoomInformationPageClick = () => {
    setMainContent(RoomInformationPage);
  }

  const [showSearchBox, setShowSearchBox] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const toggleSearch = () => {
    setShowSearchBox(!showSearchBox);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // Perform search action with searchTerm, e.g., fetch data or navigate to search results page
    console.log('Search term:', searchTerm);
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
        <div className="search-button" onClick={toggleSearch}>
          <span className="icon"></span>
        </div>
      </div>
      <nav className={`nav ${menuOpen ? 'open' : ''}`}>
        <button className="sidebar-button" onClick={handleMainPageClick}>Home</button>
        <button className="sidebar-button" onClick={handleAboutUsPageClick}>About Us</button>
        <button className="sidebar-button" onClick={handleLoginPageClick}>Log In | Register</button>
        <button className="sidebar-button" onClick={handleAccountSettingsPageClick}>Account Settings</button>
        <button className="sidebar-button" onClick={handleNotifPageClick}>Edit Notifications</button>
        <button className="sidebar-button" onClick={handleRoomInformationPageClick}>Room Information</button>



      </nav>

      {mainContent}
    </div>
  );
}

export default App;
