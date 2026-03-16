import { createPortal } from "react-dom"
import "./FeedbackModal.css"

export default function SuccessModal({ message, onClose }) {
  return createPortal(
    <div className="feedback-overlay" onClick={onClose}>
      <div className="feedback-modal" onClick={(e) => e.stopPropagation()}>
        <div className="feedback-modal__icon feedback-modal__icon--success">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <h3 className="feedback-modal__title feedback-modal__title--success">
          Success
        </h3>
        <p className="feedback-modal__message">{message}</p>
        <button
          className="feedback-modal__btn feedback-modal__btn--success"
          onClick={onClose}
        >
          Done
        </button>
      </div>
    </div>,
    document.body
  )
}