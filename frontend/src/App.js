import { Routes, Route } from 'react-router-dom';
import Home from './view/Home';
import Login from './view/Login';
import AboutUs from './view/AboutUs';
import Title from './view/Title';
import Navigation from './view/Navigation';
import { useState } from 'react';
function App() {
    const [isMenuOpen, setMenuOpen] = useState(true);
    return (
        <>
            <Title onToggle = {() => setMenuOpen(!isMenuOpen)} isMenuOpen = {isMenuOpen}/>
            <Navigation isOpen = {isMenuOpen}/>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/about" element={<AboutUs />} />
            </Routes>
        </>
    );
}

export default App;