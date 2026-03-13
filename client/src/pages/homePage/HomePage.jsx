import './HomePage.css'
import GeneralHeader from '../../components/headers/GeneralHeader'
import UserHeader from '../../components/headers/UserHeader'
import useAuth from '../../hooks/useAuth'
import EventsGrid from '../../components/event-components/EventsGrid'
import BigPoster from '../../components/event-components/BigPoster'

function Homepage() {
  const { auth } = useAuth();
  return (
    <div className='homepage'>
      {auth?.accessToken ?
        <>
          <UserHeader />
          <EventsGrid />
        </>
        :
        <>
          <GeneralHeader />
          <BigPoster />
          <EventsGrid />
        </>
      }
    </div>
  );
}

export default Homepage