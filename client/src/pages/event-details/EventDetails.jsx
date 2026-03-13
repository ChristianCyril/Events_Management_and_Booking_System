import { useState } from "react";
import MapComponent from "../../components/map/MapComponent";
import "./EventDetails.css";
import GeneralHeader from "../../components/headers/GeneralHeader";
import UserHeader from "../../components/headers/UserHeader";
import useAuth from "../../hooks/useAuth";

export default function EventDetailsPage() {
  const { auth } = useAuth();
  const event = {
    image: "/images/concert.jpg",
    title: "Summer Music Festival",
    date: "Aug 12 2026",
    time: "18:30",
    seatsRemaining: 45,
    price: 25,
    maxBookingsPerUser: 4,
    description:
      "Join us for an unforgettable night filled with music, performances, and fun.",
    location: {
      address: "Yaoundé Cultural Center",
      lat: 3.848,
      lng: 11.502,
    },
  }


  const maxAllowed = Math.min(event.maxBookingsPerUser, event.seatsRemaining);
  const [quantity, setQuantity] = useState(1);

  const increase = () => {
    if (quantity < maxAllowed) setQuantity(q => q + 1);
  };

  const decrease = () => {
    if (quantity > 1) setQuantity(q => q - 1);
  };

  const total = quantity * event.price;

  return (
    <>
      {auth?.accessToken?<UserHeader/>:<GeneralHeader/>}
      <div className="event-page-container">
        {/* LEFT SIDE */}
        <div className="event-left">
          <img
            className="event-banner"
            src={event.image}
            alt={event.title}
          />
          <h1 className="event-title">{event.title}</h1>
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
            <h2>Description</h2>
            <p>{event.description}</p>
          </div>
          <div className="event-map">
            <h2>Location</h2>
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
            <h2 className="price">
              {event.price} FCFA
            </h2>
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