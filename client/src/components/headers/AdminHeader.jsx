import { NavLink } from "react-router-dom";
import "./AdminHeader.css";
import useAuth from "../../hooks/useAuth";
export default function AdminHeader() {
  const {logout} = useAuth();
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
          <div
            className="logout"
            onClick={()=>logout()}
          >
            Logout
          </div>
          <div className="profile-icon">
            <img src="/user-icon.png" className="profile-img"/>
          </div>
        </nav>
      </div>
    </header>
  );
}