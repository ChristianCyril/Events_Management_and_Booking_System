import { useState, useRef, useEffect } from "react"
import useAuth from "../../hooks/useAuth"
import "./ProfileDropdown.css"
import ChangePasswordModal from "../changePassword-modal/ChangePasswordModal"

export default function ProfileDropdown() {
  const { auth,logout } = useAuth()
  const [open, setOpen] = useState(false)
  const dropdownRef = useRef(null)
  const [changePassMod, setChangePassMod] = useState(false)

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleChangePassword = () => {
    setOpen(false)
    setChangePassMod(true)

  }

  // Get initials from name
  const initials = auth?.firstname && auth?.lastname
    ? (auth.firstname[0] + auth.lastname[0]).toUpperCase()
    : "?"

  return (
    <div className="profile-dropdown" ref={dropdownRef}>

      {/* ── Trigger Button ── */}
      <button
        className="profile-dropdown__trigger"
        onClick={() => setOpen((prev) => !prev)}
      >
        <div className="profile-dropdown__avatar">{initials}</div>
        <span className="profile-dropdown__name">{auth?.firstname}</span>
        <svg
          className={`profile-dropdown__chevron ${open ? "profile-dropdown__chevron--open" : ""}`}
          width="14" height="14" viewBox="0 0 24 24"
          fill="none" stroke="currentColor" strokeWidth="2.5"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {/* ── Dropdown Menu ── */}
      {open && (
        <div className="profile-dropdown__menu">

          {/* User info at top */}
          <div className="profile-dropdown__user">
            <div className="profile-dropdown__user-avatar">{initials}</div>
            <div className="profile-dropdown__user-info">
              <p className="profile-dropdown__user-name">{auth?.firstname}</p>
              <p className="profile-dropdown__user-name">{auth?.lastname}</p>
            </div>
          </div>

          <div className="profile-dropdown__divider" />

          {/* Change password and logout option */}
          <button
            className="profile-dropdown__item"
            onClick={handleChangePassword}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
            Change Password
          </button>
          <button
            className="profile-dropdown__item"
            onClick={logout}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
            Logout
          </button>
        </div>
      )}
      {changePassMod && <ChangePasswordModal onClose={()=>setChangePassMod(false)}/>}
    </div>
  )
}