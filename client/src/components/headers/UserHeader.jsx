import { NavLink } from "react-router-dom";
import "./UserHeader.css";
import useAuth from "../../hooks/useAuth";

export default function UserHeader() {
  const { logout } = useAuth();
  return (
    <header className="header">
      <div className="header-inner">
        <div className="nav-left">
          <div className="genHedTitle">Ngola Events</div>
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
          <div
            className="logout"
            onClick={()=>logout()}
          >
            Logout
          </div>
          <div className="profile-icon">
            <img src="/user-icon.png" className="profile-img" />
          </div>
        </nav>
      </div>
    </header>
  );
}