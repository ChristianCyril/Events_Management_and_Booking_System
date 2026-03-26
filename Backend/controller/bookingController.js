import Booking from '../model/Booking.js'
import Event from '../model/Event.js'
import mongoose from 'mongoose'

//create booking
export const createBooking = async (req, res) => {
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
    const event = await Event.findById(eventId)
    if (!event) {
      return res.status(404).json({ message: "Event not found" })
    }
    if (new Date(event.date) < new Date()) {
      return res.status(400).json({ message: "Cannot book a past event" })
    }
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
          totalQuantity: { $sum: '$quantity' }        
        }
      }
    ])
   
    const alreadyBooked = existingBookings[0]?.totalQuantity || 0

    if (alreadyBooked + quantity > event.maxBookingsPerUser) {
      return res.status(400).json({
        message: `You can only book ${event.maxBookingsPerUser} ticket(s) for this event. You have already booked ${alreadyBooked}.`
      })
    }

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
  if (!req.params.id) {
    return res.status(400).json({ message: "Booking ID is required" })
  }
  try { 
    const booking = await Booking.findById(req.params.id)

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" })
    }

    if (!booking.user.equals(req.userId)) {
      return res.status(403).json({ message: "You are not authorised to cancel this booking" })
    }

    if (booking.status === 'cancelled') {
      return res.status(400).json({ message: "This booking is already cancelled" })
    }

    const event = await Event.findById(booking.event)
    if (!event) {
      return res.status(404).json({ message: "Associated event not found" })
    }

    if (new Date(event.date) < new Date()) {
      return res.status(400).json({ message: "Cannot cancel a booking for a past event" })
    }

    booking.status = 'cancelled'
    await booking.save()

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
    const event = await Event.findById(req.params.id)

    if (!event) {
      return res.status(404).json({ message: "Event not found" })
    }

    if (!event.createdBy.equals(req.userId)) {
      return res.status(403).json({ message: "You are not authorised to view bookings for this event" })
    }

    const bookings = await Booking.find({
      event: req.params.id,
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
