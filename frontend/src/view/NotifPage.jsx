import React from "react";
import { Link } from 'react-router-dom';
import {useMainContent, useMenuOpen, useFloor} from './CustomHooks';


function NotifPage() {
  const [menuOpen, setMenuOpen] = useMenuOpen(true);

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
        {/* <Link to="/account" className="sidebar-button">Account Settings</Link>
        <Link to="/notifications" className="sidebar-button">Edit Notifications</Link>
        <Link to="/room-information" className="sidebar-button">Room Information</Link> */}
      </nav>
      <main>
        {/* Probably a minimap on the side of the floor plan to have a reference to which room you're going for */}
        {/* . with the floor change */}
        <div className="grid-contain">
          <div id="top-set">
            <div id="new-notif">
              <fieldset>
                <legend>New Notification</legend>
                <form>
                  <label htmlFor="room">Room:</label>
                  <select id="room">
                    <option>Example Room</option>
                  </select>
                  <label htmlFor="threshold">Notify when occupancy goes over this amount of people:</label>
                  <input id="threshold" type="number" />
                  <label htmlFor="startTime">When to begin receiving notifications:</label>
                  <input id="startTime" type="time" />
                  <label htmlFor="endTime">Notifications will stop being received after:</label>
                  <input id="endTime" type="time" />
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

              <dt>Room B</dt>
              <dd>Threshold: 20</dd>
              <dd>Times: 9:00 - 15:00</dd>
              <dd><button>Delete Notification</button></dd>

              <dt>Room B</dt>
              <dd>Threshold: 20</dd>
              <dd>Times: 9:00 - 15:00</dd>
              <dd><button>Delete Notification</button></dd>

              <dt>Room B</dt>
              <dd>Threshold: 20</dd>
              <dd>Times: 9:00 - 15:00</dd>
              <dd><button>Delete Notification</button></dd>
            </dl>
          </div>
        </div>
      </main>
    </div>
  );
}

export default NotifPage;