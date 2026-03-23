import {useNavigate } from "react-router-dom";
import { useState,useEffect } from "react";
import "./AdminHeader.css";
import ProfileDropdown from "../profile-dropdown/ProfileDropdown";
export default function AdminHeader() {
  const navigate = useNavigate()
  const [searchInput, setSearchInput] = useState('');
  const [hasSearched, setHasSearched] = useState(false)
  
  useEffect(() => {
    if (!hasSearched) return
    const timer = setTimeout(() => {
      if (searchInput.trim()) {
        navigate(`/dashboard?search=${searchInput.trim()}`)
      } else {
        navigate('/dashboard')
      }
    }, 500);
    return () => clearTimeout(timer)
  }, [searchInput, navigate])
  
  return (
    <header className="adm-header">
      <div className="header-inner">
        <div className="nav-left">
          <div className="app-logo">
            <img src="/camer-events.svg" className="camer-events-logo" />
          </div>
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
          <ProfileDropdown />
        </nav>
      </div>
    </header>
  );
}