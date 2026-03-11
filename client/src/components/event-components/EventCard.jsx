import './EventCard.css'

function EventCard(){
  const event={
    image: "/images/concert.jpg",
    title: "Summer Music Festival",
    date: "Aug 12, 2026",
    time: "18:30",
    seatsRemaining: 45,
    price: 5000,
    location: "Yaoundé Cultural Center"
  }

  return (
    <div className="event-card">
      <div className="event-image">
        <img src={event.image} alt={event.title} />
      </div>
      <div className="event-content">
        <h2 className="event-title">{event.title}</h2>
        <div className="event-info">
          <p><span>Date: </span> {event.date}</p>
          <p><span>Time: </span> {event.time}</p>
          <p><span>Location: </span> {event.location}</p>
          <p><span>Price: </span>{event.price} <span className='currency'>FCFA : </span></p>
          <p><span>Seats Available: </span> {event.seatsRemaining}</p>
        </div>
      </div>
    </div>
  );
}

export default EventCard