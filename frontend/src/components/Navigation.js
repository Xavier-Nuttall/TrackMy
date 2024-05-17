import { Link } from 'react-router-dom';

function Navigation({isOpen}) {
    return (
        <nav className={`nav ${isOpen ? 'open' : ''}`}>
            <Link to="/" className="sidebar-button">Home</Link>
            <Link to="/about" className="sidebar-button">About Us</Link>
            <Link to="/login" className="sidebar-button">Log In</Link>
            {/* <Link to="/account" className="sidebar-button">Account Settings</Link>
    <Link to="/notifications" className="sidebar-button">Edit Notifications</Link>
    <Link to="/room-information" className="sidebar-button">Room Information</Link> */}
        </nav>
    )
}

export default Navigation;