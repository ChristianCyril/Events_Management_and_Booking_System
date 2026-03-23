import { useEffect } from "react";
import useApiPrivate from "./useApiPrivate";
import { useState } from "react";

export default function useGetAdminEvents(url) {
  const [events, setEvents] = useState([])
  const [isFetching, setIsFetching] = useState(true)
  const apiPrivate = useApiPrivate()
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await apiPrivate.get(url);
        setEvents(response.data.events ?? response.data)
        setIsFetching(false)
      } catch (error) {
        console.log(error)
      }
    }
    fetchEvents();
  }, [url]);
  return {events, isFetching ,setEvents};
}