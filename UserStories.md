# Role-Based Event Planner — User Stories

---

## Visitor (Not Logged In)

- [ ] As a visitor, I want to see a list of all upcoming events, so that I can browse what's available without needing an account.
- [ ] As a visitor, I want to view the full details of an event (date, time, location on a map, price, seats remaining), so that I can decide if I want to attend.
- [ ] As a visitor, I want to register for an account, so that I can book events.
- [ ] As a visitor, I want to log in to my account, so that I can access my bookings and book new events.

---

## Normal User (Logged In)

### Booking
- [ ] As a user, I want to choose how many tickets I want when booking an event, so that I can reserve spots for others as well.
- [ ] As a user, I want to be prevented from booking more tickets than the admin-set limit per user for that event, so that tickets are fairly distributed.
- [ ] As a user, I want to be prevented from booking a fully sold-out event, so that I don't attempt to pay for spots that don't exist.
- [ ] As a user, I want to complete a payment simulation (mock card details) before my booking is confirmed, so that the flow feels like a real purchase.
- [ ] As a user, I want to cancel a booking I made, so that I can free up my spots if my plans change.

### My Bookings
- [ ] As a user, I want to see all the events I've booked (including cancelled ones), so that I have a full history of my bookings.
- [ ] As a user, I want each booking in my history to show a status badge — "Confirmed" if still active, "Cancelled" if I cancelled it — so that I can tell at a glance which bookings I am still attending and which ones I have cancelled.
- [ ] As a user, I want to see the total amount I paid per booking, so that I can keep track of my spending.

### Account
- [ ] As a user, I want to update my display name, so that my profile reflects what I want to be called.
- [ ] As a user, I want to reset my password while logged in (by entering my current password and then a new one), so that I can keep my account secure.
- [ ] As a user, I want to log out of my account, so that my session is secure on shared devices.

---

## Admin

### Event Management
- [ ] As an admin, I want to create a new event with a title, description, date, time, location (picked on a map), price, capacity, and a maximum number of tickets a single user can purchase, so that users can find and book it fairly.
- [ ] As an admin, I want to edit an existing event's details, so that I can correct mistakes or update information.
- [ ] As an admin, I want to delete an event, so that I can remove events that are cancelled or no longer relevant.
- [ ] As an admin, I want to be warned before deleting an event that already has confirmed bookings, so that I don't strand users who have already booked.

### Visibility
- [ ] As an admin, I want to see all the events I've created, so that I can manage them from one place.
- [ ] As an admin, I want to see how many seats have been booked vs. total capacity for each event, so that I know how full each event is.
- [ ] As an admin, I want to see the total revenue generated per event from confirmed bookings, so that I can track earnings.
- [ ] As an admin, I want to see the list of users who have booked a specific event along with the number of tickets and amount paid per booking, so that I know who is attending and what they paid.

### Account
- [ ] As an admin, I want to update my display name, so that my profile reflects what I want to be called.
- [ ] As an admin, I want to reset my password while logged in (by entering my current password and then a new one), so that I can keep my account secure.

---

## System / Edge Cases

- [ ] The system should automatically prevent booking events that have already passed.
- [ ] The system should check that the requested ticket quantity does not exceed the remaining seats on the event.
- [ ] The system should check that the requested ticket quantity does not push the user's total tickets for that event past the per-user limit set by the admin.
- [ ] The system should decrement available seats by the booked quantity when a booking is confirmed.
- [ ] The system should increment available seats by the cancelled quantity when a booking is cancelled.
- [ ] The system should calculate and store the total amount paid (quantity x price) on each booking at the time of payment.
- [ ] The system should prevent normal users from accessing admin pages or calling admin API routes.
- [ ] The system should keep the user logged in across page refreshes using a refresh token.