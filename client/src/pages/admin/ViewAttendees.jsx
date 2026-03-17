import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import useApiPrivate from "../../hooks/useApiPrivate"
import "./ViewAttendees.css"
import formatDate from "../../utils/formatDate"
import AdminHeader from "../../components/headers/AdminHeader"
import Sidebar from "../../components/admin-sidebar/Sidebar"


export default function ViewAttendees() {
  const { eventId } = useParams()
  const apiPrivate = useApiPrivate()

  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await apiPrivate.get(`/admin/bookings/${eventId}`)
        setBookings(response.data.bookings ?? response.data)
      } catch (err) {
        setError(err?.response?.data?.message || "Failed to load attendees")
      } finally {
        setLoading(false)
      }
    }
    fetchBookings()
  }, [eventId])

  const totalBookings = bookings.length
  const totalRevenue = bookings.reduce((sum, b) => sum + b.amountPaid, 0)

  if (loading) {

    return (
      <>
        <AdminHeader />
        <Sidebar />
        <div className="attendees-page">
          <div className="attendees-skeleton" />
          <div className="attendees-skeleton attendees-skeleton--table" />
        </div>
      </>

    )
  }

  if (error) {
    return (
      <>
        <AdminHeader />
        <Sidebar />
        <div className="attendees-page">
          <div className="attendees-error">
            <p>{error}</p>
          </div>
        </div>
      </>

    )
  }

  return (
    <>
      <AdminHeader />
      <Sidebar />
      <div className="attendees-page">
        {/* ── Page Header ── */}
        <div className="attendees-page__header">
          <h1 className="attendees-page__title">Attendees</h1>
          <p className="attendees-page__subtitle">All confirmed bookings for this event</p>
        </div>
        {/* ── Summary Card ── */}
        <div className="attendees-summary">
          <div className="attendees-summary__item">
            <span className="attendees-summary__icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            </span>
            <div className="attendees-summary__text">
              <span className="attendees-summary__value">{totalBookings}</span>
              <span className="attendees-summary__label">Total Bookings</span>
            </div>
          </div>
          <div className="attendees-summary__divider" />
          <div className="attendees-summary__item">
            <span className="attendees-summary__icon attendees-summary__icon--orange">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="12" y1="1" x2="12" y2="23" />
                <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
              </svg>
            </span>
            <div className="attendees-summary__text">
              <span className="attendees-summary__value attendees-summary__value--orange">
                {totalRevenue.toLocaleString()} FCFA
              </span>
              <span className="attendees-summary__label">Total Revenue</span>
            </div>
          </div>
        </div>

        {/* ── Table ── */}
        {bookings.length === 0 ? (
          <div className="attendees-empty">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#dddddd" strokeWidth="1.5">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
            </svg>
            <p className="attendees-empty__title">No confirmed bookings yet</p>
            <p className="attendees-empty__sub">Attendees will appear here once users book this event.</p>
          </div>
        ) : (
          <div className="attendees-table-wrap">
            <table className="attendees-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Email</th>
                  <th>Booking Date</th>
                  <th>Quantity</th>
                  <th>Total Paid</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((booking, index) => {
                  return (
                    <tr key={booking._id}>
                      <td className="attendees-table__index">{index + 1}</td>
                      <td className="attendees-table__name">{booking.user.firstname}</td>
                      <td className="attendees-table__name">{booking.user.lastname}</td>
                      <td className="attendees-table__email">{booking.user.email}</td>
                      <td>{formatDate(booking.createdAt)}</td>
                      <td className="attendees-table__center">{booking.quantity}</td>
                      <td className="attendees-table__amount">{booking.amountPaid.toLocaleString()} FCFA</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>

  )
}