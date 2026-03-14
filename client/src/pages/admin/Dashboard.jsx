import { useState } from "react";
import { useNavigate } from "react-router-dom";
import './Dashboard.css'
import AdminHeader from '../../components/headers/AdminHeader'
import Sidebar from '../../components/admin-sidebar/Sidebar'
import EventTile from "../../components/event-components/EventTile";



const defaultEvents = [
  { id: 1, image: "/images/concert.jpg", title: "Summer Music Festival", date: "Aug 12, 2026", time: "18:30", seatsRemaining: 45, capacity: 200, price: 5000, location: "Yaoundé Cultural Center" },
  { id: 2, image: "/images/concert.jpg", title: "Jazz Night", date: "Aug 15, 2026", time: "20:00", seatsRemaining: 20, capacity: 80, price: 3500, location: "Hilton Hotel" },
  { id: 3, image: "/images/concert.jpg", title: "Tech Conference 2026", date: "Sep 01, 2026", time: "09:00", seatsRemaining: 100, capacity: 300, price: 2000, location: "Convention Center" },
  { id: 4, image: "/images/concert.jpg", title: "Art Exhibition", date: "Mar 05, 2025", time: "10:00", seatsRemaining: 0, capacity: 50, price: 1500, location: "National Museum" },
  { id: 5, image: "/images/concert.jpg", title: "Food & Culture Fair", date: "Sep 10, 2026", time: "11:00", seatsRemaining: 80, capacity: 150, price: 1000, location: "City Park" },
  { id: 6, image: "/images/concert.jpg", title: "Photography Workshop", date: "Feb 20, 2025", time: "14:00", seatsRemaining: 0, capacity: 30, price: 4000, location: "Art Studio" },
  { id: 7, image: "/images/concert.jpg", title: "Startup Pitch Night", date: "Oct 01, 2026", time: "17:00", seatsRemaining: 60, capacity: 100, price: 0, location: "Innovation Hub" },
  { id: 8, image: "/images/concert.jpg", title: "Dance Showcase", date: "Jan 15, 2025", time: "19:00", seatsRemaining: 0, capacity: 120, price: 2500, location: "Grand Theatre" },
  { id: 9, image: "/images/concert.jpg", title: "Book Club Meetup", date: "Oct 05, 2026", time: "16:00", seatsRemaining: 15, capacity: 40, price: 500, location: "City Library" },
  { id: 10, image: "/images/concert.jpg", title: "Film Screening", date: "Oct 12, 2026", time: "20:30", seatsRemaining: 35, capacity: 80, price: 1500, location: "Cinema Hall" },
];

function isEventPassed(dateStr) {
  const eventDate = new Date(dateStr);
  return eventDate < new Date();
}

function getBookedSeats(event) {
  return (event.capacity || 0) - (event.seatsRemaining || 0);
}


function Dashboard() {

  const navigate = useNavigate();
  const [events, setEvents] = useState(defaultEvents);

  const handleEventDeleted = (deletedId) => {
    setEvents((prev) => prev.filter((e) => e.id !== deletedId));
  };

  const upcomingCount = events.filter((e) => !isEventPassed(e.date)).length;
  const passedCount = events.filter((e) => isEventPassed(e.date)).length;
  const totalBooked = events.reduce((sum, e) => sum + getBookedSeats(e), 0);

  return (
    <>
      <AdminHeader />
      <Sidebar />
      <div className="dashboard">
        {/* ── Summary Strip ── */}
        <div className="dashboard__summary">
          <div className="dashboard__summary-item">
            <span className="dashboard__summary-value">{events.length}</span>
            <span className="dashboard__summary-label">Total Events</span>
          </div>
          <div className="dashboard__summary-divider" />
          <div className="dashboard__summary-item">
            <span className="dashboard__summary-value dashboard__summary-value--orange">{upcomingCount}</span>
            <span className="dashboard__summary-label">Upcoming</span>
          </div>
          <div className="dashboard__summary-divider" />
          <div className="dashboard__summary-item">
            <span className="dashboard__summary-value dashboard__summary-value--muted">{passedCount}</span>
            <span className="dashboard__summary-label">Passed</span>
          </div>
          <div className="dashboard__summary-divider" />
          <div className="dashboard__summary-item">
            <span className="dashboard__summary-value">{totalBooked}</span>
            <span className="dashboard__summary-label">Total Booked</span>
          </div>
        </div>
        {/* ── My Events Card ── */}
        <div className="dashboard__card">

          <div className="dashboard__card-header">
            <div>
              <h2 className="dashboard__card-title">My Events</h2>
              <p className="dashboard__card-subtitle">{events.length} event{events.length !== 1 ? "s" : ""} total</p>
            </div>
            <button
              className="dashboard__create-btn"
              onClick={() => navigate("/create-event")}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
              New Event
            </button>
          </div>
          {/* Grid */}
          {events.length === 0 ? (
            <div className="dashboard__empty">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#cccccc" strokeWidth="1.5"><rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>
              <p>You have not created any events yet.</p>
              <button onClick={() => navigate("/admin/events/create")}>
                Create your first event
              </button>
            </div>
          ) : (
            <div className="dashboard__grid">
              {events.map((event) => (
                <EventTile
                  key={event.id}
                  event={event}
                  onDeleted={handleEventDeleted}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Dashboard