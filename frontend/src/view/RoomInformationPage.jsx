import React from "react";
import { Chart as ChartJS } from "chart.js/auto";
import { Bar, Line } from "react-chartjs-2";
import { Link } from 'react-router-dom';
import {useMainContent, useMenuOpen, useFloor} from './CustomHooks';



function RoomInformationPage() {
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
        <Link to="/account" className="sidebar-button">Account Settings</Link>
        <Link to="/notifications" className="sidebar-button">Edit Notifications</Link>
        <Link to="/room-information" className="sidebar-button">Room Information</Link>
      </nav>
      <main>
        <div className="general-panel">
          <h1>Room information</h1>
          <p>This will be where all the graphs and such for each room will be</p>

          <Line
            data={{
              labels: ["A", "B", "C"],
              datasets: [
                {
                  label: "Revenue",
                  data: [200, 300, 400],
                }
              ],

            }}
          />
        </div>
      </main>
    </div>
  );
}

export default RoomInformationPage;