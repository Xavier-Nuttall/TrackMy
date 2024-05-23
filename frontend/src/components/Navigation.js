import { Link } from 'react-router-dom';

function Navigation({ isOpen, loggedIn }) {
    return (
        <nav className={`nav ${isOpen ? 'open' : ''}`}>
            <Link to="/" className="sidebar-button">Home</Link>
            <Link to="/about" className="sidebar-button">About Us</Link>
            <Link to="/login" className="sidebar-button">{loggedIn ? "Logout" : "Log In"}</Link>
            {loggedIn && (
                <Link to="/account" className="sidebar-button">Account</Link>
            )}
            <Link to="/room-trends" className="sidebar-button">Room Trends</Link>
        </nav>
    );
}

export default Navigation;
