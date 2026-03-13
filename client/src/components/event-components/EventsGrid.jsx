import EventCard from './EventCard';
import './EventsGrid.css';

function EventsGrid({ events = [] }) {
  // Default sample events if none provided
  const defaultEvents = [
    {
      id: 1,
      image: "/images/concert.jpg",
      title: "Summer Music Festival",
      date: "Aug 12, 2026",
      time: "18:30",
      seatsRemaining: 45,
      price: 5000,
      location: "Yaoundé Cultural Center"
    },
    {
      id: 2,
      image: "/images/concert.jpg",
      title: "Jazz Night",
      date: "Aug 15, 2026",
      time: "20:00",
      seatsRemaining: 20,
      price: 3500,
      location: "Hilton Hotel"
    },
    {
      id: 3,
      image: "/images/concert.jpg",
      title: "Tech Conference 2026",
      date: "Sep 01, 2026",
      time: "09:00",
      seatsRemaining: 100,
      price: 2000,
      location: "Convention Center"
    },
    {
      id: 4,
      image: "/images/concert.jpg",
      title: "Art Exhibition",
      date: "Sep 05, 2026",
      time: "10:00",
      seatsRemaining: 0,
      price: 1500,
      location: "National Museum"
    },
    {
      id: 5,
      image: "/images/concert.jpg",
      title: "Art Exhibition",
      date: "Sep 05, 2026",
      time: "10:00",
      seatsRemaining: 0,
      price: 1500,
      location: "National Museum"
    },
    {
      id: 6,
      image: "/images/concert.jpg",
      title: "Art Exhibition",
      date: "Sep 05, 2026",
      time: "10:00",
      seatsRemaining: 0,
      price: 1500,
      location: "National Museum"
    },
    {
      id: 7,
      image: "/images/concert.jpg",
      title: "Art Exhibition",
      date: "Sep 05, 2026",
      time: "10:00",
      seatsRemaining: 0,
      price: 1500,
      location: "National Museum"
    },
    {
      id: 8,
      image: "/images/concert.jpg",
      title: "Art Exhibition",
      date: "Sep 05, 2026",
      time: "10:00",
      seatsRemaining: 0,
      price: 1500,
      location: "National Museum"
    },
    {
      id: 9,
      image: "/images/concert.jpg",
      title: "Art Exhibition",
      date: "Sep 05, 2026",
      time: "10:00",
      seatsRemaining: 0,
      price: 1500,
      location: "National Museum"
    },
    {
      id: 10,
      image: "/images/concert.jpg",
      title: "Art Exhibition",
      date: "Sep 05, 2026",
      time: "10:00",
      seatsRemaining: 0,
      price: 1500,
      location: "National Museum"
    },
  ];

  const eventList = events.length > 0 ? events : defaultEvents;

  return (
    <div className="events-grid-container">
      <h2 className="events-grid-title">Events</h2>
      <div className="events-grid">
        {eventList.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
}

export default EventsGrid;
