import { NavLink   } from "react-router-dom";
import "./GeneralHeader.css";

export default function GeneralHeader() {
  return (
     <header className="gen-header">
      <div className="header-inner">
        <div className="nav-left">
          <div className="genHedTitle">Ngola Events</div>
          <NavLink to="/homepage" className="nav-item">About</NavLink >
        </div>
        <div className="header-search">
          <input
            type="text"
            placeholder="Search events..."
            className="search-input"
          />
        </div>
        <nav className="nav-right">
          <NavLink  to="/homepage" className="nav-item">Home</NavLink >
          <NavLink  to="/login" className="nav-item">Login</NavLink >
          <NavLink  to="/register" className="nav-item">Register</NavLink >
        </nav>
      </div>
    </header>
  );
}