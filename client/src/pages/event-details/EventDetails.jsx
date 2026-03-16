import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MapComponent from "../../components/map/MapComponent";
import "./EventDetails.css";
import GeneralHeader from "../../components/headers/GeneralHeader";
import UserHeader from "../../components/headers/UserHeader";
import useAuth from "../../hooks/useAuth";
import { api } from "../../api/axios";
import { useParams } from "react-router-dom";
import LoadingSpinner from "../../components/loadingSpinner/LoadingSpinner";
import formatDate from "../../utils/formatDate";
import BookingModal from "../../components/booking-modal/BookingModal";
import useApiPrivate from "../../hooks/useApiPrivate";
import ErrorModal from "../../components/feedback-modal/ErrorModal";
import SuccessModal from "../../components/feedback-modal/SuccessModal";
const initialValue = {
  image: "",
  title: "",
  date: "",
  time: "",
  seatsRemaining: 0,
  price: 0,
  maxBookingsPerUser: 0,
  description: "",
  location: {
    address: "",
    lat: 0,
    lng: 0,
  },
}


export default function EventDetailsPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { auth } = useAuth();
  const [event, setEvent] = useState(initialValue)
  const [quantity, setQuantity] = useState(1);
  const [isfetching, setIsFetching] = useState(true)
  const [isFetchError, setIsFetchError] = useState(false);
  const [showModal, setShowModal] = useState(false)
  const [bookingLoading, setBookingLoading] = useState(false)
  const apiPrivate = useApiPrivate()
  const [errorMessage, setErrorMessage] = useState('')
  const [showErrFBModal,setshowErrFBModal ] = useState(false)
  const [showSuccFBModal,setshowSuccFBModal ] = useState(false)



  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await api.get(`/event/${id}`)
        setEvent(response.data)
      } catch (error) {
        console.log(error)
        setIsFetchError(true);
      } finally {
        setIsFetching(false)
      }
    }
    fetchEvent()
  }, []);

  const handleConfirmBooking = async () => {
    try {
      setBookingLoading(true)
      await apiPrivate.post('/bookings', {
        eventId: event._id,
        quantity
      }, {
        headers: { 'Content-Type': 'application/json' }
      })
      setShowModal(false)
      // Optional: show success message or redirect to my bookings
      setshowSuccFBModal(true)
    } catch (error) {
      setErrorMessage(error?.response?.data?.message || "Something went wrong")
      setshowErrFBModal(true)
    } finally {
      setBookingLoading(false)
    }
  }

  //utils
  const maxAllowed = Math.min(event.maxBookingsPerUser, event.seatsRemaining);
  const increase = () => {
    if (quantity < maxAllowed) setQuantity(q => q + 1);
  };
  const decrease = () => {
    if (quantity > 1) setQuantity(q => q - 1);
  };
  const total = quantity * event.price;

  if (isfetching) return <LoadingSpinner />
  return (
    <>
      {auth?.accessToken ? <UserHeader /> : <GeneralHeader />}
      <div className="event-page-container">
        {/* LEFT SIDE */}
        <div className="event-left">
          {isFetchError && <p className="fetch-err">Something went Wrong</p>}
          <img
            className="event-banner"
            src={event.image.url}
            alt={event.title}
          />
          <p className="event-title">{event.title}</p>
          <div className="event-meta">
            <div>
              <span>Date</span>
              <p>{formatDate(event.date)}</p>
            </div>
            <div>
              <span>Time</span>
              <p>{event.time}</p>
            </div>
            <div>
              <span>Location</span>
              <p>{event.location.address}</p>
            </div>
            <div>
              <span>Seats Remaining</span>
              <p>{event.seatsRemaining}</p>
            </div>
          </div>
          <div className="event-description">
            <p>Description</p>
            <p>{event.description}</p>
          </div>
          <div className="event-map">
            <p>Location</p>
            <MapComponent
              lat={event.location.lat}
              lng={event.location.lng}
              address={event.location.address}
            />
          </div>
        </div>
        {/* RIGHT SIDE */}
        {auth?.accessToken ?
          <div className="event-right">
            <div className="purchase-card">
              <p className="price">
                {event.price} FCFA
              </p>
              <p className="max-limit">
                Max per user: {event.maxBookingsPerUser}
              </p>
              <div className="ticket-selector">
                <button onClick={decrease}>-</button>
                <span>{quantity}</span>
                <button onClick={increase}>+</button>
              </div>
              <p className="available">
                Available: {event.seatsRemaining}
              </p>
              <div className="total">
                Total: {total} FCFA
              </div>
              <button
                className="purchase-btn"
                onClick={() => setShowModal(true)}
                disabled={event.seatsRemaining === 0}
              >
                {event.seatsRemaining === 0 ? "Sold Out" : "Buy Ticket"}
              </button>
              {showModal && (
                <BookingModal
                  event={event}
                  quantity={quantity}
                  total={total}
                  onClose={() => setShowModal(false)}
                  onConfirm={handleConfirmBooking}
                  loading={bookingLoading}
                />
              )}
            </div>
          </div>
          : <div className="booking-card">
            <h3 className="booking-title">Want to attend this event?</h3>
            <p className="booking-text">
              Create an account to book your spot and manage your reservations.
            </p>
            <div className="booking-actions">
              <button className="register-btn" onClick={() => navigate("/register")}>Register</button>
              <button className="login-btn" onClick={() => navigate("/login")}>Login</button>
            </div>
          </div>}
          {showErrFBModal&&(
            <ErrorModal message={errorMessage} onClose={()=>setshowErrFBModal(false)}/>)
          }
          {showSuccFBModal&&(
            <SuccessModal message={"Booking confirmed!"} onClose={()=>setshowSuccFBModal(false)}/>)
          }
      </div>
    </>
  );
}