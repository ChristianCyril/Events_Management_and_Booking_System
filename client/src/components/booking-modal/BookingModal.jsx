import { useState } from "react"
import "./BookingModal.css"
import { createPortal } from "react-dom"

export default function BookingModal({ event, quantity, total, onClose, onConfirm, loading }) {

  const [step, setStep] = useState(2) // starts at step 2 -- order summary

  const [cardDetails, setCardDetails] = useState({
    cardNumber: "",
    expiry: "",
    cvv: "",
    cardHolder: "",
  })

  const [cardErrors, setCardErrors] = useState({})

  const handleCardChange = (e) => {
    const { name, value } = e.target

    // Auto-format card number -- add space every 4 digits
    if (name === "cardNumber") {
      const formatted = value.replace(/\s/g, "").replace(/(.{4})/g, "$1 ").trim()
      if (formatted.replace(/\s/g, "").length <= 16) {
        setCardDetails((prev) => ({ ...prev, cardNumber: formatted }))
      }
      return
    }

    // Auto-format expiry -- add slash after MM
    if (name === "expiry") {
      const cleaned = value.replace(/\D/g, "")
      const formatted = cleaned.length >= 2
        ? cleaned.slice(0, 2) + (cleaned.length > 2 ? "/" + cleaned.slice(2, 4) : "")
        : cleaned
      setCardDetails((prev) => ({ ...prev, expiry: formatted }))
      return
    }

    // CVV -- numbers only, max 3 digits
    if (name === "cvv") {
      if (/^\d{0,3}$/.test(value)) {
        setCardDetails((prev) => ({ ...prev, cvv: value }))
      }
      return
    }

    setCardDetails((prev) => ({ ...prev, [name]: value }))
  }

  const validateCard = () => {
    const errors = {}
    const rawCard = cardDetails.cardNumber.replace(/\s/g, "")

    if (!cardDetails.cardHolder.trim()) {
      errors.cardHolder = "Cardholder name is required"
    }
    if (rawCard.length !== 16) {
      errors.cardNumber = "Card number must be 16 digits"
    }
    if (!/^\d{2}\/\d{2}$/.test(cardDetails.expiry)) {
      errors.expiry = "Enter a valid expiry date (MM/YY)"
    }
    if (cardDetails.cvv.length !== 3) {
      errors.cvv = "CVV must be 3 digits"
    }

    return errors
  }

  const handlePay = () => {
    const errors = validateCard()
    setCardErrors(errors)
    if (Object.keys(errors).length > 0) return
    // All valid -- call parent confirm handler
    onConfirm()
  }

  return createPortal(
    <div className="booking-modal-overlay" onClick={onClose}>
      <div className="booking-modal" onClick={(e) => e.stopPropagation()}>

        {/* ── Header ── */}
        <div className="booking-modal__header">
          <div className="booking-modal__steps">
            <span className={step === 2 ? "active" : "done"}>Order Summary</span>
            <span className="booking-modal__step-divider">›</span>
            <span className={step === 3 ? "active" : ""}>Payment</span>
          </div>
          <button className="booking-modal__close" onClick={onClose}>✕</button>
        </div>

        {/* ── Step 2: Order Summary ── */}
        {step === 2 && (
          <div className="booking-modal__body">
            <div className="booking-modal__event-info">
              <img
                src={event.image?.url}
                alt={event.title}
                className="booking-modal__event-image"
                onError={(e) => { e.target.src = "https://placehold.co/80x80/f0f0f0/aaa?text=No+Image" }}
              />
              <div>
                <p className="booking-modal__event-title">{event.title}</p>
                <p className="booking-modal__event-meta">{event.date} · {event.time}</p>
                <p className="booking-modal__event-meta">{event.location.address}</p>
              </div>
            </div>

            <div className="booking-modal__summary">
              <div className="booking-modal__summary-row">
                <span>Price per ticket</span>
                <span>{event.price} FCFA</span>
              </div>
              <div className="booking-modal__summary-row">
                <span>Quantity</span>
                <span>{quantity} ticket{quantity > 1 ? "s" : ""}</span>
              </div>
              <div className="booking-modal__summary-row booking-modal__summary-row--total">
                <span>Total</span>
                <span>{total} FCFA</span>
              </div>
            </div>

            <button
              className="booking-modal__btn"
              onClick={() => setStep(3)}
            >
              Continue to Payment
            </button>
          </div>
        )}

        {/* ── Step 3: Payment Form ── */}
        {step === 3 && (
          <div className="booking-modal__body">
            <div className="booking-modal__mock-notice">
              🔒 This is a simulated payment. Do not enter real card details.
            </div>

            <div className="booking-modal__form">

              <div className="booking-modal__field">
                <label>Cardholder Name</label>
                {cardErrors.cardHolder && (
                  <p className="booking-modal__error">{cardErrors.cardHolder}</p>
                )}
                <input
                  type="text"
                  name="cardHolder"
                  value={cardDetails.cardHolder}
                  onChange={handleCardChange}
                  placeholder="CYRIL NGUEGANG"
                />
              </div>

              <div className="booking-modal__field">
                <label>Card Number</label>
                {cardErrors.cardNumber && (
                  <p className="booking-modal__error">{cardErrors.cardNumber}</p>
                )}
                <input
                  type="text"
                  name="cardNumber"
                  value={cardDetails.cardNumber}
                  onChange={handleCardChange}
                  placeholder="0000 0000 0000 0000"
                  inputMode="numeric"
                />
              </div>

              <div className="booking-modal__row">
                <div className="booking-modal__field">
                  <label>Expiry Date</label>
                  {cardErrors.expiry && (
                    <p className="booking-modal__error">{cardErrors.expiry}</p>
                  )}
                  <input
                    type="text"
                    name="expiry"
                    value={cardDetails.expiry}
                    onChange={handleCardChange}
                    placeholder="MM/YY"
                    inputMode="numeric"
                  />
                </div>

                <div className="booking-modal__field">
                  <label>CVV</label>
                  {cardErrors.cvv && (
                    <p className="booking-modal__error">{cardErrors.cvv}</p>
                  )}
                  <input
                    type="text"
                    name="cvv"
                    value={cardDetails.cvv}
                    onChange={handleCardChange}
                    placeholder="123"
                    inputMode="numeric"
                  />
                </div>
              </div>

            </div>

            {/* Order total reminder at bottom of payment step */}
            <div className="booking-modal__total-reminder">
              <span>You will be charged</span>
              <span className="booking-modal__total-amount">{total} FCFA</span>
            </div>

            <div className="booking-modal__payment-actions">
              <button
                className="booking-modal__btn--back"
                onClick={() => setStep(2)}
                disabled={loading}
              >
                Back
              </button>
              <button
                className="booking-modal__btn"
                onClick={handlePay}
                disabled={loading}
              >
                {loading ? "Processing..." : `Pay ${total} FCFA`}
              </button>
            </div>
          </div>
        )}

      </div>
    </div>,
    document.body
  )
}