import { useEffect } from "react";
import useApiPrivate from "./useApiPrivate";
import { useState } from "react";

export default function useGetAdminEvents() {
  const [events, setEvents] = useState([])
  const apiPrivate = useApiPrivate()
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await apiPrivate.get('/admin/event');
        setEvents(response.data);
      } catch (error) {
        console.log(error)
      }
    }
    fetchEvents();
  }, []);
  return events;
}