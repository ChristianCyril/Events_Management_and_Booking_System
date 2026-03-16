import { useState, useEffect } from "react"
import BookingList from "../../components/booking-component/BookingList"
import SuccessModal from "../../components/feedback-modal/SuccessModal"
import ErrorModal from "../../components/feedback-modal/ErrorModal"
import UserHeader from "../../components/headers/UserHeader"
import useApiPrivate from "../../hooks/useApiPrivate"
import "./MyBookings.css"

export default function MyBookings() {
  const apiPrivate = useApiPrivate()

  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState("all")
  const [successMessage, setSuccessMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await apiPrivate.get("/bookings")
        setBookings(response.data.bookings ?? response.data)
      } catch (error) {
        setErrorMessage(error?.response?.data?.message || "Failed to load bookings")
      } finally {
        setLoading(false)
      }
    }
    fetchBookings()
  }, [])

  const handleCancel = async (bookingId) => {
    try {
      await apiPrivate.patch(`/bookings/${bookingId}`)
      setBookings((prev) =>
        prev.map((b) => b._id === bookingId ? { ...b, status: "cancelled" } : b)
      )
      setSuccessMessage("Your booking has been cancelled successfully.")
    } catch (error) {
      setErrorMessage(error?.response?.data?.message || "Failed to cancel booking")
    } 
  }

  const confirmedCount = bookings.filter((b) => b.status === "confirmed").length
  const cancelledCount = bookings.filter((b) => b.status === "cancelled").length
  const totalSpent = bookings
    .filter((b) => b.status === "confirmed")
    .reduce((sum, b) => sum + b.amountPaid, 0)

  const filteredBookings = bookings.filter((b) => {
    if (filter === "confirmed") return b.status === "confirmed"
    if (filter === "cancelled") return b.status === "cancelled"
    return true    //returns all if filter is none of the above
  })

  return (
    <>
      <UserHeader />
      <div className="mybookings-page">

        {/* ── Page Title ── */}
        <div className="mybookings-page__header">
          <h1 className="mybookings-page__title">My Bookings</h1>
          <p className="mybookings-page__subtitle">Your full booking history</p>
        </div>

        {/* ── Summary Strip ── */}
        <div className="mybookings-page__summary">
          <div className="mybookings-page__summary-item">
            <span className="mybookings-page__summary-value">{bookings.length}</span>
            <span className="mybookings-page__summary-label">Total</span>
          </div>
          <div className="mybookings-page__summary-divider" />
          <div className="mybookings-page__summary-item">
            <span className="mybookings-page__summary-value mybookings-page__summary-value--green">{confirmedCount}</span>
            <span className="mybookings-page__summary-label">Confirmed</span>
          </div>
          <div className="mybookings-page__summary-divider" />
          <div className="mybookings-page__summary-item">
            <span className="mybookings-page__summary-value mybookings-page__summary-value--muted">{cancelledCount}</span>
            <span className="mybookings-page__summary-label">Cancelled</span>
          </div>
          <div className="mybookings-page__summary-divider" />
          <div className="mybookings-page__summary-item">
            <span className="mybookings-page__summary-value mybookings-page__summary-value--orange">{totalSpent.toLocaleString()} FCFA</span>
            <span className="mybookings-page__summary-label">Total Spent</span>
          </div>
        </div>

        {/* ── Filter Tabs ── */}
        <div className="mybookings-page__filters">
          {["all", "confirmed", "cancelled"].map((f) => (
            <button
              key={f}
              className={`mybookings-page__filter-btn ${filter === f ? "mybookings-page__filter-btn--active" : ""}`}
              onClick={() => setFilter(f)}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
              <span className="mybookings-page__filter-count">
                {f === "all" ? bookings.length : f === "confirmed" ? confirmedCount : cancelledCount}
              </span>
            </button>
          ))}
        </div>

        {/* ── Content ── */}
        <div className="mybookings-page__content">
          {loading ? (
            <div className="mybookings-page__skeletons">
              <div className="mybookings-page__skeleton" />
              <div className="mybookings-page__skeleton" />
              <div className="mybookings-page__skeleton" />
            </div>
          ) : (
            <BookingList
              bookings={filteredBookings}
              onCancel={handleCancel}
            />
          )}
        </div>

      </div>

      {successMessage && (
        <SuccessModal message={successMessage} onClose={() => setSuccessMessage(null)} />
      )}
      {errorMessage && (
        <ErrorModal message={errorMessage} onClose={() => setErrorMessage(null)} />
      )}
    </>
  )
}