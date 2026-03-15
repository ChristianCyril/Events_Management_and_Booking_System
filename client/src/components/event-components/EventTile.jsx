import './EventTile.css'
import { useNavigate } from 'react-router-dom'
import DeleteEventButton from '../delete-btn-modal/DeleteEvent'
import formatDate from '../../utils/formatDate';
import {isEventPassed,getBookedSeats} from '../../utils/eventUtils'



export default function EventTile({ event, onDeleted }) {
  const navigate = useNavigate();
  const passed = isEventPassed(event.date);
  const booked = getBookedSeats(event);
  const fillPercent = event.capacity ? Math.round((booked / event.capacity) * 100) : 0;

  return (
    <div className={`event-tile ${passed ? "event-tile--passed" : ""}`}>
      <span className={`event-tile__status ${passed ? "event-tile__status--passed" : "event-tile__status--upcoming"}`}>
        {passed ? "Passed" : "Upcoming"}
      </span>
      <div className="event-tile__image-wrap">
        <img
          src={event.image.url}
          alt={event.title}
          className="event-tile__image"
          onError={(e) => { e.target.src = "https://placehold.co/400x180/f0f0f0/aaaaaa?text=No+Image"; }}
        />
      </div>
      <div className="event-tile__body">
        <h3 className="event-tile__title">{event.title}</h3>
        <div className="event-tile__meta">
          <span className="event-tile__meta-item">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
            { formatDate(event.date)}
          </span>
          <span className="event-tile__meta-item">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
            {event.time}
          </span>
        </div>
        <div className="event-tile__capacity">
          <div className="event-tile__capacity-label">
            <span>{booked} / {event.capacity} booked</span>
            <span>{fillPercent}%</span>
          </div>
          <div className="event-tile__capacity-bar">
            <div
              className="event-tile__capacity-fill"
              style={{ width: `${fillPercent}%` }}
            />
          </div>
        </div>
        <div className="event-tile__actions">
          <button
            className="event-tile__action event-tile__action--attendees"
            title="View Attendees"
            onClick={() => navigate(`/admin/events/${event.id}/attendees`)}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
          </button>
          <button
            className="event-tile__action event-tile__action--view"
            title="View Event"
            onClick={() => navigate(`/view-event/${event._id}`)}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
          </button>
          <button
            className="event-tile__action event-tile__action--edit"
            title="Edit Event"
            onClick={() => navigate(`/edit-event/${event._id}`)}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
          </button>
          <DeleteEventButton
            eventId={event._id}
            onDeleted={onDeleted}
          />
        </div>
      </div>
    </div>
  );
}
