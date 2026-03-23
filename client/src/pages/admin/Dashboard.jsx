import { useEffect, useState } from "react";
import { useNavigate,useSearchParams  } from "react-router-dom";
import './Dashboard.css'
import AdminHeader from '../../components/headers/AdminHeader'
import Sidebar from '../../components/admin-sidebar/Sidebar'
import EventTile from "../../components/event-components/EventTile";
import useGetAdminEvents from "../../hooks/useGetAdminEvents";
import {isEventPassed,getBookedSeats} from '../../utils/eventUtils'
import { } from "react-router-dom";


function Dashboard() {
  const navigate = useNavigate();
  const [searchParam] = useSearchParams();
  const search = searchParam.get('search')
  const url = search ? `/admin/event?search=${search}`:'/admin/event'
  const {events, isFetching,setEvents} = useGetAdminEvents(url);
  

  const handleEventDeleted = (deletedId) => {
    setEvents((prev) => prev.filter((event) => event._id !== deletedId));
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
              <button onClick={() => navigate("/create-event")}>
                Create your first event
              </button>
            </div>
          ) : (
            <div className="dashboard__grid">
             { events.map((event) => (
                <EventTile
                  key={event._id}
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