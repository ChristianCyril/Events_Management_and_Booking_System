import { NavLink } from "react-router-dom";
import "./AdminHeader.css";
export default function AdminHeader() {
  return (
    <header className="adm-header">
      <div className="header-inner">
        <div className="nav-left">
          <div className="genHedTitle">Ngola Events</div>
          <div className="genHedTitle adm-label">Admin</div>
          <NavLink to="/homepage" className="nav-item">Events</NavLink >
        </div>
        <div className="header-search">
          <input
            type="text"
            placeholder="Search events..."
            className="search-input"
          />
        </div>
        <nav className="nav-right">
          <NavLink to="/login" className="nav-item">Logout</NavLink >
          <div className="profile-icon">
            <img src="/user-icon.png" className="profile-img"/>
          </div>
        </nav>
      </div>
    </header>
  );
}