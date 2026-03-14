// components/DeleteEventButton.jsx
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import useApiPrivate from "../../hooks/useApiPrivate"
import "./DeleteEvent.css"
import { createPortal } from 'react-dom' 

export default function DeleteEventButton({ eventId, onDeleted }) {
  const apiPrivate = useApiPrivate();

  const [showModal, setShowModal] = useState(false);
  const [warning, setWarning] = useState(null); // holds confirmed bookings count
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleDeleteClick = async () => {
    setError("")
    setLoading(true)

    try {
      // First attempt -- no force flag
      await apiPrivate.delete(`/admin/event/${eventId}`)
      // No warning -- deleted successfully, no confirmed bookings existed
      onDeleted(eventId)
    } catch (err) {
      if (err?.response?.status === 409) {
        // Backend warned about confirmed bookings
        // Show the modal with the warning
        setWarning(err.response.data.confirmedBookings)
        setShowModal(true)
      } else {
        setError(err?.response?.data?.message || "Something went wrong")
      }
    } finally {
      setLoading(false)
    }
  }

  const handleForceDelete = async () => {
    setError("")
    setLoading(true)

    try {
      // Second attempt -- with force flag
      await apiPrivate.delete(`/admin/event/${eventId}?force=true`)
      setShowModal(false)
      onDeleted(eventId) // tell parent to remove event from the list
    } catch (err) {
      setError(err?.response?.data?.message || "Something went wrong")
      setShowModal(false)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {error && <p className="error-message">{error}</p>}

      <button
        className="delete-btn"
        onClick={handleDeleteClick}
        disabled={loading}
      >
        {loading ? "Deleting..." : "Delete"}
      </button>

      {showModal && createPortal(
        <div className="modal-overlay">
          <div className="modal">
            <h3>Warning</h3>
            <p>
              This event has <strong>{warning} confirmed booking(s)</strong>.
              Deleting it will affect users who have already booked.
              Are you sure you want to proceed?
            </p>
            {error && <p className="error-message">{error}</p>}
            <div className="modal-actions">
              <button
                className="cancel-btn"
                onClick={() => setShowModal(false)}
                disabled={loading}
              >
                Cancel
              </button>
              <button
                className="confirm-delete-btn"
                onClick={handleForceDelete}
                disabled={loading}
              >
                {loading ? "Deleting..." : "Yes, Delete Anyway"}
              </button>
            </div>
          </div>
        </div>, document.body
      )}
    </>
  )
}