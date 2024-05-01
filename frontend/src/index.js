import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './view/Home';
import AboutUs from './view/AboutUs';
import Login from './view/Login';
import AccountSettings from './view/AccountPage';
import Notifications from './view/NotifPage';
import RoomInformationPage from './view/RoomInformationPage';

const root = createRoot(document.getElementById('root'));

const App = () => (
  <Router>
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/about" element={<AboutUs />} />
      {/* <Route path="/account" element={<AccountSettings />} />
      <Route path="/notifications" element={<Notifications />} /> */}
      {/* <Route path="/room-information" element={<RoomInformationPage />} /> */}
    </Routes>
  </Router>
);

root.render(<App />);
