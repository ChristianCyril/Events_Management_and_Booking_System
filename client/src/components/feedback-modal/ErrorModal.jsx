import { createPortal } from "react-dom"
import "./FeedbackModal.css"

export default function ErrorModal({ message, onClose }) {
  return createPortal(
    <div className="feedback-overlay" onClick={onClose}>
      <div className="feedback-modal" onClick={(e) => e.stopPropagation()}>
        <div className="feedback-modal__icon feedback-modal__icon--error">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </div>
        <h3 className="feedback-modal__title feedback-modal__title--error">
          Something Went Wrong
        </h3>
        <p className="feedback-modal__message">{message}</p>
        <button
          className="feedback-modal__btn feedback-modal__btn--error"
          onClick={onClose}
        >
          Try Again
        </button>
      </div>
    </div>,
    document.body
  )
}