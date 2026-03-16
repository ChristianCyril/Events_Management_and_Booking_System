import Booking from '../model/Booking.js'
import Event from '../model/Event.js'
import mongoose from 'mongoose'

//create booking
export const createBooking = async (req, res) => {
  // Validate request body ───────────────────────────────────────────────────
  if (!req.body.eventId) {
    return res.status(400).json({ message: "Event ID is required" })
  }
  if (!req.body.quantity) {
    return res.status(400).json({ message: "Quantity is required" })
  }
  if (req.body.quantity < 1) {
    return res.status(400).json({ message: "Quantity must be at least 1" })
  }

  const { eventId, quantity } = req.body

  try {
    // Check Event exists
    const event = await Event.findById(eventId)
    if (!event) {
      return res.status(404).json({ message: "Event not found" })
    }
    // Check Event has not passed 
    if (new Date(event.date) < new Date()) {
      return res.status(400).json({ message: "Cannot book a past event" })
    }
    // Check Enough seats remaining 
    if (Number(quantity) > event.seatsRemaining) {
      return res.status(400).json({
        message: `Only ${event.seatsRemaining} seat(s) remaining for this event`
      })
    }
    // Check Per-user limit
    const existingBookings = await Booking.aggregate([
      {
        $match: {
          user: new mongoose.Types.ObjectId(req.userId),
          event: event._id,
          status: 'confirmed'
        }
      },
      {
        $group: {
          _id: null,
          totalQuantity: { $sum: '$quantity' }         // Sum all confirmed bookings this user already has for this event
        }
      }
    ])
   
    const alreadyBooked = existingBookings[0]?.totalQuantity || 0

    if (alreadyBooked + quantity > event.maxBookingsPerUser) {
      return res.status(400).json({
        message: `You can only book ${event.maxBookingsPerUser} ticket(s) for this event. You have already booked ${alreadyBooked}.`
      })
    }

    // All checks passed: create booking 
    // Snapshot the price at booking time 
    const priceAtBooking = event.price
    const amountPaid = quantity * priceAtBooking

    const newBooking = await Booking.create({
      user: req.userId,
      event: event._id,
      quantity,
      priceAtBooking,
      amountPaid,
      status: 'confirmed',
    })

    // Decrement seats on the event
    event.seatsRemaining -= quantity
    await event.save()

    res.status(201).json({
      message: "Booking confirmed",
      booking: {
        id: newBooking._id,
        event: event.title,
        quantity: newBooking.quantity,
        amountPaid: newBooking.amountPaid,
        status: newBooking.status,
      }
    })

  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server error" })
  }
}


//cancel booking
export const cancelBooking = async (req, res) => {
  // Validate booking id
  if (!req.params.id) {
    return res.status(400).json({ message: "Booking ID is required" })
  }

  try {
    // Find the booking first
    const booking = await Booking.findById(req.params.id)

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" })
    }

    // Make sure the booking belongs to the logged in user
    // A user should never be able to cancel someone else's booking
    if (!booking.user.equals(req.userId)) {
      return res.status(403).json({ message: "You are not authorised to cancel this booking" })
    }

    // Check the booking is not already cancelled
    if (booking.status === 'cancelled') {
      return res.status(400).json({ message: "This booking is already cancelled" })
    }

    // Check the event has not already passed
    // No point releasing seats on a past event
    const event = await Event.findById(booking.event)

    if (!event) {
      return res.status(404).json({ message: "Associated event not found" })
    }

    if (new Date(event.date) < new Date()) {
      return res.status(400).json({ message: "Cannot cancel a booking for a past event" })
    }

    // All checks passed -- cancel the booking
    booking.status = 'cancelled'
    await booking.save()

    // Release the seats back to the event
    event.seatsRemaining += booking.quantity
    await event.save()

    res.status(200).json({
      message: "Booking cancelled successfully",
      booking: {
        id: booking._id,
        event: event.title,
        quantity: booking.quantity,
        status: booking.status,
      }
    })

  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server error" })
  }
}


// user gets his bookings
export const getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.userId })
      .populate('event', 'title date time location image price')
      .sort({ createdAt: -1 }) // most recent first

    if (!bookings.length) {
      return res.status(200).json({ message: "You have no bookings yet", bookings: [] })
    }

    res.status(200).json(bookings)

  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server error" })
  }
}


// admin gets bookings for events created by him
export const getEventBookings = async (req, res) => {
  try {
    // Verify the event exists and belongs to this admin
    const event = await Event.findById(req.params.eventId)

    if (!event) {
      return res.status(404).json({ message: "Event not found" })
    }

    if (!event.createdBy.equals(req.userId)) {
      return res.status(403).json({ message: "You are not authorised to view bookings for this event" })
    }

    const bookings = await Booking.find({
      event: req.params.eventId,
      status: 'confirmed' // only show confirmed bookings to admin
    })
      .populate('user', 'firstname lastname email')
      .sort({ createdAt: -1 })

    if (!bookings.length) {
      return res.status(200).json({ message: "No confirmed bookings for this event yet", bookings: [] })
    }

    res.status(200).json(bookings)

  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server error" })
  }
}
