import { NavLink, useNavigate   } from "react-router-dom";
import "./GeneralHeader.css";
import { useState } from "react";
import { useEffect } from "react";

export default function GeneralHeader() {
  const navigate = useNavigate()
  const [searchInput, setSearchInput] = useState('');
  const [hasSearched, setHasSearched] = useState(false)
  useEffect(()=>{
    if(!hasSearched) return
    const timer = setTimeout(() => {
      if(searchInput.trim()){
        navigate(`/?search=${searchInput.trim()}`)
      }else{
        navigate('/')
      }   
    }, 500);
    return () => clearTimeout(timer)
  },[searchInput,navigate])
  
  return (
     <header className="gen-header">
      <div className="header-inner">
        <div className="nav-left">
          <div className="app-logo">
            <img src="/camer-events.svg" className="camer-events-logo"/>
          </div>
          <NavLink to="" className="nav-item">About</NavLink >
        </div>
        <div className="header-search">
          <input
            type="text"
            placeholder="Search events..."
            className="search-input"
            value={searchInput}
            onChange={(e)=>{
              setSearchInput(e.target.value)
              setHasSearched(true)
            } }
          />
        </div>
        <nav className="nav-right">
          <NavLink  to="/" className="nav-item">Home</NavLink >
          <NavLink  to="/login" className="nav-item">Login</NavLink >
          <NavLink  to="/register" className="nav-item">Register</NavLink >
        </nav>
      </div>
    </header>
  );
}