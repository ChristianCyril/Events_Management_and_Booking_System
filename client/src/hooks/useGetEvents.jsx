import { useEffect } from "react";
import { api } from "../api/axios";
import { useState } from "react";

export default function useGetEvents() {
  const [events, setEvents] = useState([])
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await api.get('/event');
        setEvents(response.data);
      } catch (error) {
        console.log(error)
      }
    }
    fetchEvents();
  }, []);
  return events;
}