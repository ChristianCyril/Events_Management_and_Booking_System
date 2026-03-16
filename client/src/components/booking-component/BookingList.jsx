import BookingCard from "./BookingCard"
import "./BookingList.css"

export default function BookingList({ bookings, onCancel }) {
  if (!bookings.length) {
    return (
      <div className="booking-list__empty">
        <p className="booking-list__empty-title">No bookings found</p>
        <p className="booking-list__empty-sub">Browse events and book your first ticket.</p>
      </div>
    )
  }

  return (
    <div className="booking-list">
      {bookings.map((booking) => (
        <BookingCard
          key={booking._id}
          booking={booking}
          onCancel={onCancel}
        />
      ))}
    </div>
  )
}