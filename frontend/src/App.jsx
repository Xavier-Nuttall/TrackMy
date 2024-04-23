import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import WebSocketComponent from './websocketcomponent';

function HomePage() {
  return (
    <main>
      <div className="grid-contain">
        <div id="graph-show">
          <p>heatmap goes here</p>
          <WebSocketComponent></WebSocketComponent>
        </div>
        <div id="room-show">
          <p>individual room stats go here either via grid or list</p>
        </div>
      </div>
    </main>
  );
}

function AboutUsPage() {
  return (
    <main>
      <div className="general-panel">
        <h1>About TrackMy</h1>
        <p>Something to help monitor how much people are in a given place's rooms.<br />Not sure what else to say.</p>
      </div>
    </main>
  );
}

function LoginPage() {
  return (
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
  );
}

function AccountPage() {
  return (
    <main>
      <div className="general-panel">
        <h1>Welcome, [User]</h1>
        <fieldset>
          <legend>Edit Details</legend>
          <form>
            <label>Email:</label><input type="email" name="email" />
            <label>User:</label><input type="text" name="user" />
            <label>First Name:</label><input type="text" name="firstName" />
            <label>Last Name:</label><input type="text" name="lastName" />
            <label>Other Names:</label><input type="text" name="otherNames" />
            <label>Pass:</label><input type="password" name="pass" />
            <input type="submit" value="Submit Details" />
          </form>
        </fieldset>
        <button style={{ width: '100%', position: 'absolute', bottom: 0 }}>Log Out</button>
      </div>
    </main>
  );
}

function NotifPage() {
  return (
    <main>
      {/* Comment: probably a minimap on the side of the floor plan to have a reference to which room you're going for */}
      {/* Comment: with the floor change */}
      <div className="grid-contain">
        <div id="top-set">
          <div id="new-notif">
            <fieldset>
              <legend>New Notification</legend>
              <form>
                <label>Room:</label>
                <select name="room">
                  <option>Example Room</option>
                </select>
                <label>Notify when occupancy goes over this amount of people:</label><input type="number" name="threshold" />
                <label>When to begin receiving notifications:</label><input type="time" name="startTime" />
                <label>Notifications will stop being received after:</label><input type="time" name="endTime" />
                <input type="submit" value="Create New" />
              </form>
            </fieldset>
          </div>
          <div id="mini-map">
            <p>heatmap goes here albeit without current stats.<br />primarily for reference when making notifs</p>
          </div>
        </div>
        <div id="full-list">
          <h3>Current Notifications</h3>
          <dl id="list-notifs">
            <dt>Room A</dt>
            <dd>Threshold: 10</dd>
            <dd>Times: 10:00 - 18:00</dd>
            <dd><button>Delete Notification</button></dd>

            <dt>Room B</dt>
            <dd>Threshold: 20</dd>
            <dd>Times: 9:00 - 15:00</dd>
            <dd><button>Delete Notification</button></dd>
          </dl>
        </div>
      </div>
    </main>
  );
}

function App() {
  const [mainContent, setMainContent] = useState(HomePage);
  const [menuOpen, setMenuOpen] = useState(true);

  const toggleFilter = () => {
    console.log("Hello");
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
    <html>
      <head>
        <title>TrackMy</title>
      </head>
      <body>
        <div className={`content-container${menuOpen ? '2' : '1'}`}>
          <div id="title">
            <div id="menu" onClick={toggleFilter}>
              <div id="menu-button" className={`menu-button ${menuOpen ? 'change' : ''}`} >
                <div class="bar1"></div>
                <div class="bar2"></div>
                <div class="bar3"></div>
              </div>
            </div>
            <h1>TrackMy</h1>
            <div className="search-container">
              <button className="search-button" onClick={toggleSearch}>
                <span className="icon"></span>
              </button>
            </div>
          </div>
          <nav className={menuOpen ? '' : 'hide-nav'}>
            <div className="go" id="graph">
              <button onClick={handleMainPageClick}>Home</button>
            </div>
            <div className="go" id="about">
              <button onClick={handleAboutUsPageClick}>About Us</button>
            </div>
            <div className="go" id="login">
              <button onClick={handleLoginPageClick}>Log In | Register</button>
            </div>
            <div className="go" id="settings">
              <button onClick={handleAccountSettingsPageClick}>Account Settings</button>
            </div>
            <div className="go" id="notif">
              <button onClick={handleNotifPageClick}>Edit Notifications</button>
            </div>

            <dl id="curr-notifs">
              <dt>Room A</dt>
              <dd>Threshold: 10</dd>
              <dd>Times: 10:00 - 18:00</dd>

              <dt>Room B</dt>
              <dd>Threshold: 20</dd>
              <dd>Times: 9:00 - 15:00</dd>
            </dl>
          </nav>

          {mainContent}
        </div>
      </body>
    </html>
  );
}

export default App;
