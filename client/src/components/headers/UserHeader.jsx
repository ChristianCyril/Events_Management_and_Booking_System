import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./UserHeader.css";
import ProfileDropdown from "../profile-dropdown/ProfileDropdown";


export default function UserHeader() {
  const navigate = useNavigate()
  const [searchInput, setSearchInput] = useState('');
  const [hasSearched, setHasSearched] = useState(false)
  useEffect(() => {
    if (!hasSearched) return
    const timer = setTimeout(() => {
      if (searchInput.trim()) {
        navigate(`/?search=${searchInput.trim()}`)
      } else {
        navigate('/')
      }
    }, 500);
    return () => clearTimeout(timer)
  }, [searchInput, navigate])

  return (
    <header className="header">
      <div className="header-inner">
        <div className="nav-left">
          <div className="app-logo">
            <img src="/camer-events.svg" className="camer-events-logo" />
          </div>
          <NavLink to="/" className="nav-item">About</NavLink >
        </div>
        <div className="header-search">
          <input
            type="text"
            placeholder="Search events..."
            className="search-input"
            value={searchInput}
            onChange={(e) => {
              setSearchInput(e.target.value)
              setHasSearched(true)
            }}
          />
        </div>
        <nav className="nav-right">
          <NavLink to="/" className="nav-item">Home</NavLink >
          <NavLink to="/bookings" className="nav-item">Bookings</NavLink >
          <ProfileDropdown />
        </nav>
      </div>
    </header>
  );
}