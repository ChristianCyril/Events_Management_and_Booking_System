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
            <img src="create-icon.png" className="sidebar-icon" />
            <span className="sidebar-label">New Event</span>
          </NavLink>
          
          <NavLink to="/analytics" className="sidebar-item">
            <img src="/metrics-icon.png" className="sidebar-icon" />
            <span className="sidebar-label">Analytics</span>
          </NavLink>
        </nav>
      </div>
    </aside>
  );
}
