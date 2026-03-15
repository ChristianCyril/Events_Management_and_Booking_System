import { useEffect, useState } from "react";
import MapComponent from "../../components/map/MapComponent";
import "./ViewEvent.css";
import useApiPrivate from "../../hooks/useApiPrivate";
import { useParams } from "react-router-dom";
import LoadingSpinner from "../../components/loadingSpinner/LoadingSpinner";
import formatDate from "../../utils/formatDate";
import Sidebar from "../../components/admin-sidebar/Sidebar";
import AdminHeader from "../../components/headers/AdminHeader";


export default function ViewEvent() {
  const { id } = useParams()
  const [event, setEvent] = useState({})
  const [isFetching, setIsFetching] = useState(true)
  const apiPrivate = useApiPrivate();
  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await apiPrivate.get(`/admin/event/${id}`)
        response.data != null && setEvent(response.data)
      } catch (error) {
        console.log(error)
      } finally {
        setIsFetching(false)
      }
    }
    fetchEvent();
  },[])

  if(isFetching) return <LoadingSpinner/>
  return (
    <>
      <AdminHeader/>
      <Sidebar/>
      <div className="view-page-container">
        <div className="event-left">
          <img
            className="event-banner"
            src={event.image.url}
            alt={event.title}
          />
          <p className="event-title">{event.title}</p>
          <div className="event-meta">
            <div>
              <span>Date</span>
              <p>{formatDate(event.date )}</p>
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
      </div>
    </>

  );
}