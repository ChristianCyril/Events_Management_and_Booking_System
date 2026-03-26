import './EventCard.css'
import formatDate from '../../utils/formatDate';
import { useNavigate } from 'react-router-dom';
function EventCard({event}){
  const navigate = useNavigate();
  return (
    <div className="event-card" onClick={()=>navigate(`/event-details/${event._id}`)}>
      <div className="event-image">
        <img src={event.image.url} alt={event.title} />
      </div>
      <div className="event-content">
        <h2 className="event-title">{event.title}</h2>
        <div className="event-info">
          <p><span>Date: </span>{formatDate(event.date)}</p>
          <p><span>Time: </span> {event.time}</p>
          <p><span>Location: </span> {event.location.address}</p>
          <p><span>Price: </span>{event.price===0?'FREE':event.price} <span className='currency'>{event.price===0?'':'FCFA'}</span></p>
          <p><span>Seats Available: </span> {event.seatsRemaining}</p>
        </div>
      </div>
    </div>
  );
}

export default EventCard