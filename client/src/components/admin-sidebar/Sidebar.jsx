import { NavLink } from "react-router-dom";
import "./Sidebar.css";

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-inner">
        <nav className="sidebar-nav">
          <NavLink to="/dashboard" className="sidebar-item">
            <img src="/dashboard-icon.png"  className="sidebar-icon" />
            <span className="sidebar-label">Dashboard</span>
          </NavLink>
          
          <NavLink to="/create-event" className="sidebar-item">
            <img src="/create-icon.png" className="sidebar-icon" />
            <span className="sidebar-label">New Event</span>
          </NavLink>
          
          <NavLink to="/history" className="sidebar-item">
            <img src="/history-icon.png" className="sidebar-icon" />
            <span className="sidebar-label">History</span>
          </NavLink>
        </nav>
      </div>
    </aside>
  );
}
