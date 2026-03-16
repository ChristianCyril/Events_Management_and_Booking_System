import "./BookingCard.css"

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  })
}

export default function BookingCard({ booking, onCancel }) {
  const { event, quantity, amountPaid, priceAtBooking, status, createdAt } = booking
  const isPast = new Date(event.date) < new Date()

  return (
    <div className={`booking-card ${status === "cancelled" ? "booking-card--cancelled" : ""}`}>

      <img
        className="booking-card__image"
        src={event.image?.url}
        alt={event.title}
        onError={(e) => { e.target.src = "https://placehold.co/140x100/f0f0f0/aaa?text=No+Image" }}
      />

      <div className="booking-card__info">
        <div className="booking-card__title-row">
          <h3 className="booking-card__title">{event.title}</h3>
          <span className={`booking-card__badge ${status === "confirmed" ? "booking-card__badge--confirmed" : "booking-card__badge--cancelled"}`}>
            {status === "confirmed" ? "Confirmed" : "Cancelled"}
          </span>
        </div>
        <p className="booking-card__meta">{formatDate(event.date)} · {event.time}</p>
        <p className="booking-card__meta">{event.location.address}</p>
        <p className="booking-card__meta">Booked on {formatDate(createdAt)}</p>
      </div>

      <div className="booking-card__stats">
        <div className="booking-card__stat">
          <span className="booking-card__stat-label">Tickets</span>
          <span className="booking-card__stat-value">{quantity}</span>
        </div>
        <div className="booking-card__stat">
          <span className="booking-card__stat-label">Price each</span>
          <span className="booking-card__stat-value">{priceAtBooking.toLocaleString()} FCFA</span>
        </div>
        <div className="booking-card__stat">
          <span className="booking-card__stat-label">Total paid</span>
          <span className="booking-card__stat-value booking-card__stat-value--orange">{amountPaid.toLocaleString()} FCFA</span>
        </div>
      </div>

      <div className="booking-card__action">
        {status === "confirmed" && !isPast ? (
          <button className="booking-card__cancel-btn" onClick={() => onCancel(booking._id) } disabled = {isPast}>
            Cancel
          </button>
        ) : (
          <span className="booking-card__no-action">
            {isPast ? "Event passed" : "Cancelled"}
          </span>
        )}
      </div>

    </div>
  )
}