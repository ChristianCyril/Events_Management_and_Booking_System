export function isEventPassed(dateStr) {
  const eventDate = new Date(dateStr);
  return eventDate < new Date();
}

export function getBookedSeats(event) {
  return (event.capacity || 0) - (event.seatsRemaining || 0);
}
