import React from 'react';

function AboutUsPage({ isOpen }) {
  return (
    <main className={`${isOpen ? '' : 'open'}`}>
      <div className="general-panel">
        <h1>About TrackMy</h1>
        <p>Something to help monitor how much people are in a given place's rooms.<br />Not sure what else to say.</p>
      </div>
    </main>
  );
}

export default AboutUsPage;