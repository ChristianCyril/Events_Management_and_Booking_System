import { useState } from "react"
import { createPortal } from "react-dom"
import useApiPrivate from "../../hooks/useApiPrivate"
import "./ChangePasswordModal.css"
import SuccessModal from "../feedback-modal/SuccessModal"
import ErrorModal from "../feedback-modal/ErrorModal"

export default function ChangePasswordModal({ onClose }) {
  const apiPrivate = useApiPrivate()

  const [formValues, setFormValues] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })
  const [formErrors, setFormErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [serverError, setServerError] = useState("")
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [showErrModal, setShowErrModal] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormValues((prev) => ({ ...prev, [name]: value }))
  }

  const validate = () => {
    const errors = {}
    if (!formValues.currentPassword) {
      errors.currentPassword = "Current password is required"
    }
    if (!formValues.newPassword) {
      errors.newPassword = "New password is required"
    } else if (formValues.newPassword.length < 6) {
      errors.newPassword = "Password must be at least 6 characters"
    }
    if (!formValues.confirmPassword) {
      errors.confirmPassword = "Please confirm your new password"
    } else if (formValues.newPassword !== formValues.confirmPassword) {
      errors.confirmPassword = "Passwords do not match"
    }
    return errors
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setServerError("")
    const errors = validate()
    setFormErrors(errors)
    if (Object.keys(errors).length > 0) return

    try {
      setLoading(true)
      await apiPrivate.patch("/change-password", {
        currentPassword: formValues.currentPassword,
        newPassword: formValues.newPassword,
      },
        {
          headers: { 'Content-Type': 'application/json' }
        }
      )
      setShowSuccessModal(true)
    } catch (error) {
      setServerError(error?.response?.data?.message || "Something went wrong")
      setShowErrModal(true)
    } finally {
      setLoading(false)
    }
  }

  return createPortal(
    <div className="cpmodal-overlay" onClick={onClose}>
      <div className="cpmodal" onClick={(e) => e.stopPropagation()}>

        {/* ── Header ── */}
        <div className="cpmodal__header">
          <div className="cpmodal__header-left">
            <div className="cpmodal__icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
            </div>
            <h3 className="cpmodal__title">Change Password</h3>
          </div>
          <button className="cpmodal__close" onClick={onClose} type="button">✕</button>
        </div>

        {/* ── Form ── */}
        <form className="cpmodal__form" onSubmit={handleSubmit}>

          {serverError && (
            <div className="cpmodal__server-error">{serverError}</div>
          )}

          <div className="cpmodal__field">
            <label className="cpmodal__label">Current Password</label>
            {formErrors.currentPassword && (
              <p className="cpmodal__error">{formErrors.currentPassword}</p>
            )}
            <input
              className="cpmodal__input"
              type="password"
              name="currentPassword"
              value={formValues.currentPassword}
              onChange={handleChange}
              placeholder="Enter current password"
            />
          </div>

          <div className="cpmodal__field">
            <label className="cpmodal__label">New Password</label>
            {formErrors.newPassword && (
              <p className="cpmodal__error">{formErrors.newPassword}</p>
            )}
            <input
              className="cpmodal__input"
              type="password"
              name="newPassword"
              value={formValues.newPassword}
              onChange={handleChange}
              placeholder="Enter new password"
            />
          </div>

          <div className="cpmodal__field">
            <label className="cpmodal__label">Confirm New Password</label>
            {formErrors.confirmPassword && (
              <p className="cpmodal__error">{formErrors.confirmPassword}</p>
            )}
            <input
              className="cpmodal__input"
              type="password"
              name="confirmPassword"
              value={formValues.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm new password"
            />
          </div>

          <div className="cpmodal__actions">
            <button
              type="button"
              className="cpmodal__btn--cancel"
              onClick={onClose}
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="cpmodal__btn--submit"
              disabled={loading}
            >
              {loading ? "Saving..." : "Save Password"}
            </button>
          </div>

        </form>
      </div>
      {showSuccessModal && <SuccessModal message={"Your password has been changed successfully."} onClose={() => setShowSuccessModal(false)} />}
      {showErrModal && <ErrorModal message={serverError} onClose={() => setShowErrModal(false)} />}
    </div>,
    document.body
  )
}