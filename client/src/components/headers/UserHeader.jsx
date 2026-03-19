import { NavLink } from "react-router-dom";
import "./UserHeader.css";
import ProfileDropdown from "../profile-dropdown/ProfileDropdown";


export default function UserHeader() {
  return (
    <header className="header">
      <div className="header-inner">
        <div className="nav-left">
          <div className="app-logo">
            <img src="./camer-events.svg" className="camer-events-logo"/>
          </div>
          <NavLink to="/" className="nav-item">About</NavLink >
        </div>
        <div className="header-search">
          <input
            type="text"
            placeholder="Search events..."
            className="search-input"
          />
        </div>
        <nav className="nav-right">
          <NavLink to="/" className="nav-item">Home</NavLink >
          <NavLink to="/bookings" className="nav-item">Bookings</NavLink >
          <ProfileDropdown/>
        </nav>
      </div>
    </header>
  );
}