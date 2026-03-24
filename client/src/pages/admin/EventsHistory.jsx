import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import useApiPrivate from "../../hooks/useApiPrivate"
import "./EventsHistory.css"
import AdminHeader from '../../components/headers/AdminHeader'
import SideBar from '../../components/admin-sidebar/Sidebar'

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  })
}

function isEventPassed(dateStr) {
  return new Date(dateStr) < new Date()
}



export default function EventsHistory() {
  const navigate = useNavigate()
  const apiPrivate = useApiPrivate()
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    const getEvents = async ()=>{
      try {
      const response = await apiPrivate.get('/admin/event/history')
      setEvents(response.data.events ?? response.data)
    } catch (error) {
      setErrorMessage(
        error?.message ||
        error?.response?.data?.message ||
        "Something went wrong"
      )
    }finally{
      setLoading(false)
    }
    }
    getEvents();
  }, [])
  
  // Summary calculations
  const totalEvents = events.length 
  const totalConfirmed = events.reduce((sum, e) => sum + e.confirmedBookings, 0)
  const totalCancelled = events.reduce((sum, e) => sum + e.cancelledBookings, 0)
  const totalRevenue = events.reduce((sum, e) => sum + e.revenue, 0)
  const totalAttendees = events.reduce((sum, e) => sum + (e.capacity - e.seatsRemaining), 0)

  return (
    <>
    <AdminHeader/>
    <SideBar/>
    <div className="history-page">

      {/* ── Page Header ── */}
      <div className="history-page__header">
        <div>
          <h1 className="history-page__title">Events History</h1>
          <p className="history-page__subtitle">Summary of all your past events</p>
        </div>
      </div>

      {/* ── Summary Strip ── */}
      <div className="history-page__summary">
        <div className="history-page__summary-item">
          <div className="history-page__summary-icon history-page__summary-icon--blue">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
            </svg>
          </div>
          <div className="history-page__summary-text">
            <span className="history-page__summary-value">{totalEvents}</span>
            <span className="history-page__summary-label">Past Events</span>
          </div>
        </div>

        <div className="history-page__summary-divider" />

        <div className="history-page__summary-item">
          <div className="history-page__summary-icon history-page__summary-icon--green">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          </div>
          <div className="history-page__summary-text">
            <span className="history-page__summary-value history-page__summary-value--green">{totalAttendees}</span>
            <span className="history-page__summary-label">Total Attendees</span>
          </div>
        </div>

        <div className="history-page__summary-divider" />

        <div className="history-page__summary-item">
          <div className="history-page__summary-icon history-page__summary-icon--orange">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="20 12 20 22 4 22 4 12" />
              <rect x="2" y="7" width="20" height="5" />
              <line x1="12" y1="22" x2="12" y2="7" />
              <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" />
              <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" />
            </svg>
          </div>
          <div className="history-page__summary-text">
            <span className="history-page__summary-value history-page__summary-value--orange">
              {totalConfirmed}
            </span>
            <span className="history-page__summary-label">Confirmed Bookings</span>
          </div>
        </div>

        <div className="history-page__summary-divider" />

        <div className="history-page__summary-item">
          <div className="history-page__summary-icon history-page__summary-icon--red">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <line x1="15" y1="9" x2="9" y2="15" />
              <line x1="9" y1="9" x2="15" y2="15" />
            </svg>
          </div>
          <div className="history-page__summary-text">
            <span className="history-page__summary-value history-page__summary-value--red">
              {totalCancelled}
            </span>
            <span className="history-page__summary-label">Cancelled Bookings</span>
          </div>
        </div>

        <div className="history-page__summary-divider" />

        <div className="history-page__summary-item">
          <div className="history-page__summary-icon history-page__summary-icon--purple">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="12" y1="1" x2="12" y2="23" />
              <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
          </div>
          <div className="history-page__summary-text">
            <span className="history-page__summary-value history-page__summary-value--purple">
              {totalRevenue.toLocaleString()} FCFA
            </span>
            <span className="history-page__summary-label">Total Revenue</span>
          </div>
        </div>
      </div>
      {errorMessage && <p className="err-message">{errorMessage}</p>}
      {/* ── Events List ── */}
      {loading ? (
        <div className="history-page__skeletons">
          {[1, 2, 3].map((n) => <div key={n} className="history-page__skeleton" />)}
        </div>
      ) : events.length === 0 ? (
        <div className="history-page__empty">
          <svg width="52" height="52" viewBox="0 0 24 24" fill="none" stroke="#dddddd" strokeWidth="1.5">
            <rect x="3" y="4" width="18" height="18" rx="2" />
            <line x1="16" y1="2" x2="16" y2="6" />
            <line x1="8" y1="2" x2="8" y2="6" />
            <line x1="3" y1="10" x2="21" y2="10" />
          </svg>
          <p className="history-page__empty-title">No past events yet</p>
          <p className="history-page__empty-sub">Your completed events will appear here.</p>
        </div>
      ) : (
        <div className="history-page__list">
          {events.map((event) => (
            <div key={event._id} className="history-card">

              {/* Image */}
              <div className="history-card__image-wrap">
                <img
                  src={event.image?.url}
                  alt={event.title}
                  className="history-card__image"
                  onError={(e) => { e.target.src = "https://placehold.co/140x100/f0f0f0/aaa?text=No+Image" }}
                />
                <span className="history-card__passed-badge">Passed</span>
              </div>

              {/* Info */}
              <div className="history-card__info">
                <h3 className="history-card__title">{event.title}</h3>
                <div className="history-card__meta">
                  <span className="history-card__meta-item">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="4" width="18" height="18" rx="2" />
                      <line x1="16" y1="2" x2="16" y2="6" />
                      <line x1="8" y1="2" x2="8" y2="6" />
                      <line x1="3" y1="10" x2="21" y2="10" />
                    </svg>
                    {formatDate(event.date)} · {event.time}
                  </span>
                  <span className="history-card__meta-item">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                    {event.location.address}
                  </span>
                  <span className="history-card__meta-item">
                    {event.price.toLocaleString()} FCFA per ticket
                  </span>
                </div>
              </div>

              {/* Stats */}
              <div className="history-card__stats">
                <div className="history-card__stat">
                  <span className="history-card__stat-label">Capacity</span>
                  <span className="history-card__stat-value">{event.capacity}</span>
                </div>
                <div className="history-card__stat">
                  <span className="history-card__stat-label">Attended</span>
                  <span className="history-card__stat-value history-card__stat-value--green">
                    {event.confirmedBookings}
                  </span>
                </div>
                <div className="history-card__stat">
                  <span className="history-card__stat-label">Cancelled</span>
                  <span className="history-card__stat-value history-card__stat-value--red">
                    {event.cancelledBookings}
                  </span>
                </div>
                <div className="history-card__stat">
                  <span className="history-card__stat-label">Revenue</span>
                  <span className="history-card__stat-value history-card__stat-value--orange">
                    {event.revenue.toLocaleString()} FCFA
                  </span>
                </div>
              </div>

              {/* Action */}
              <div className="history-card__action">
                <button
                  className="history-card__view-btn"
                  onClick={() => navigate(`/view-attendees/${event._id}`)}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                  Attendees
                </button>
              </div>

            </div>
          ))}
        </div>
      )}
    </div>
    </>
    
  )
}