import { useEffect, useState } from "react";
import MapComponent from "../../components/map/MapComponent";
import "./EventDetails.css";
import GeneralHeader from "../../components/headers/GeneralHeader";
import UserHeader from "../../components/headers/UserHeader";
import useAuth from "../../hooks/useAuth";
import { api } from "../../api/axios";
import { useParams } from "react-router-dom";
import LoadingSpinner from "../../components/loadingSpinner/LoadingSpinner";

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
  const { id } = useParams();
  const { auth } = useAuth();
  const [event, setEvent] = useState(initialValue)
  const [quantity, setQuantity] = useState(1);
  const [isfetching, setIsFetching] = useState(true)
  const [isError, setIsError] = useState(false);
  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await api.get(`/event/${id}`)
        setEvent(response.data)
      } catch (error) {
        console.log(error)
        setIsError(true);
      } finally {
        setIsFetching(false)
      }
    }
    fetchEvent()
  }, [])

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
          {isError&& <p className="fetch-err">Something went Wrong</p>}
          <img
            className="event-banner"
            src={event.image.url}
            alt={event.title}
          />
          <p className="event-title">{event.title}</p>
          <div className="event-meta">
            <div>
              <span>Date</span>
              <p>{event.date}</p>
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
            <button className="purchase-btn">
              Buy Ticket
            </button>
          </div>
        </div>
      </div>
    </>

  );
}