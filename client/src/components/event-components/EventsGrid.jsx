import EventCard from './EventCard';
import './EventsGrid.css';
import useGetEvents from '../../hooks/useGetEvents'
import { useEffect, useRef} from 'react';
import { useSearchParams } from 'react-router-dom';

function EventsGrid() {
  const [searchParams] = useSearchParams();
  const search = searchParams.get('search');
  const url = search ? `/event?search=${search}`: '/event'
  const { events, loading } = useGetEvents(url)
  const eventsGridRef = useRef(null)

  useEffect(()=>{
    if(search && eventsGridRef.current){
      eventsGridRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      })
    }
  },[])
 
  return (
    <div className="events-grid-container" ref={eventsGridRef}>
      <h2 className="events-grid-title">Events</h2>
      {loading?
        <div className="loadspinner">
          <img src="/loading.svg" />
        </div>
        : 
        events.length === 0 ?
        <div className="events-grid-empty">
          <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="#cccccc" strokeWidth="1.5"><rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>
          <p>No Available events now</p>
        </div>
        :
        <div className="events-grid" >
          {events.map((event) => (
            <EventCard key={event._id} event={event} />
          ))}
        </div>
        }
      
    </div>
  );
}

export default EventsGrid;
