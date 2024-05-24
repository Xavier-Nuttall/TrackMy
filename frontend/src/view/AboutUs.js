import React from 'react';

function AboutUsPage({ isOpen }) {
  return (
    <main className={`about-us-container ${isOpen ? '' : 'open'}`}>
      <div className="about-us-box">
        <h2>About Us</h2>
        <p>
          Welcome to <strong>TrackMy</strong>, your go-to solution for monitoring room occupancy in buildings. Our app provides real-time heatmaps, detailed graphs, notifications, and trend analyses, displaying maximum, average, and minimum occupancy for various time periods including hourly, daily, weekly, and monthly.
        </p>
        <p>
          Our team is comprised of dedicated students from the University of Otago:
        </p>
        <ul className="team-list">
          <li>Charlie Templeton</li>
          <li>Xavier Nuttall</li>
          <li>Dianne Margaret Albarico</li>
          <li>Ben English</li>
        </ul>
        <p>
          Together, we aim to enhance your ability to manage and monitor room usage effectively with accurate data and insightful visualizations.
        </p>
      </div>
    </main>
  );
}

export default AboutUsPage;