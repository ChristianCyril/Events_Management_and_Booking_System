import { NavLink } from "react-router-dom";
import "./AdminHeader.css";
import ProfileDropdown from "../profile-dropdown/ProfileDropdown";
export default function AdminHeader() {
  return (
    <header className="adm-header">
      <div className="header-inner">
        <div className="nav-left">
          <div className="genHedTitle">Ngola Events</div>
          <div className="genHedTitle adm-label">Admin</div>
        </div>
        <div className="header-search">
          <input
            type="text"
            placeholder="Search events..."
            className="search-input"
          />
        </div>
        <nav className="nav-right">
        <ProfileDropdown/>
        </nav>
      </div>
    </header>
  );
}