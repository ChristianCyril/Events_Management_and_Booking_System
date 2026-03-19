import { useEffect } from "react";
import { api } from "../api/axios";
import { useState } from "react";

export default function useGetEvents(url) {
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await api.get(url)
        setEvents(response.data)
        setLoading(false)
      } catch (error) {
        console.log(error)
      }
    }
    fetchEvents()
  }, [url]);
  return {events,loading}
}