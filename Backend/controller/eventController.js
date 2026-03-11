import Event from "../model/Event.js";
import mongoose from "mongoose";

export const createEvent = async (req, res) => {
  //Validating data in req body
  if (!req.body.title) return res.status(400).json({ message: "Title is required" });
  if (!req.body.description) return res.status(400).json({ message: "Description is required" });
  if (!req.body.date) return res.status(400).json({ message: "Date is required" });
  if (!req.body.time) return res.status(400).json({ message: "Time is required" });
  if (!req.body.location) return res.status(400).json({ message: "Location is required" });
  if (!req.body.location?.address) return res.status(400).json({ message: "Address is required" });
  if (req.body.location?.lat === undefined) return res.status(400).json({ message: "Latitude is required" });
  if (req.body.location?.lng === undefined) return res.status(400).json({ message: "Longitude is required" });
  if (req.body.price === undefined) return res.status(400).json({ message: "Price is required" });
  if (req.body.capacity === undefined) return res.status(400).json({ message: "Capacity is required" });
  if (req.body.maxBookingsPerUser === undefined) return res.status(400).json({ message: "Max bookings per user is required" });
  if (!req.userId) return res.status(400).json({ message: "Creator ID is required" });  //comes from middleware verify jwt

  try {
    const newEvent = await Event.create(
      {
        title: req.body.title,
        description: req.body.description,
        date: req.body.date,
        time: req.body.time,
        location: {
          address: req.body.location.address,
          lat: req.body.location.lat,
          lng: req.body.location.lng
        },
        price: req.body.price,
        capacity: req.body.capacity,
        maxBookingsPerUser: req.body.maxBookingsPerUser,
        createdBy: req.userId
      }
    );
    if (newEvent) {
      res.status(201).json({ "message": `Event ${newEvent._id.toString()} created successfully` })
    }
  } catch (error) {
    console.error(error)
  }
}


export const handleGetEvents = async (req, res) => {
  try {
    const events = await Event.find().exec();
    if (events) {
      res.status(200).json(events)
    }
  } catch (error) {
    console.error(error)
  }
}

export const handleSingleEvent = async (req, res) => {
  if (!req.params?.id) return res.status(400).json({ "message": 'Event Id has not been found in params' });
  const eventId = req.params.id
  try {
    const event = await Event.findOne({ _id: eventId }).exec();
    if (!event) return res.status(404).json({ "message": 'Event does not exist' })
    res.status(200).json(event);
  } catch (error) {
    console.error(error)
  }
}


export const updateEvent = async (req, res) => {
  if (!req.params.id) return res.status(400).json({ message: "Event ID is required" });
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: "Event not found" });

    if (event.createdBy.toString() !== req.userId) {
      return res.status(403).json({ message: "You are not authorised to update this event" });
    }

    if (req.body.title) event.title = req.body.title;
    if (req.body.description) event.description = req.body.description;
    if (req.body.date) event.date = req.body.date;
    if (req.body.time) event.time = req.body.time;
    if (req.body.price !== undefined) event.price = req.body.price;

    if (req.body.maxBookingsPerUser !== undefined) {
      const effectiveCapacity = req.body.capacity !== undefined ? req.body.capacity : event.capacity  //making sure it does not exeed capacity in db or the current one that has been modified.
      if (req.body.maxBookingsPerUser > effectiveCapacity) {
        return res.status(400).json({
          message: "Max bookings per user cannot exceed total capacity"
        });
      }
      event.maxBookingsPerUser = req.body.maxBookingsPerUser
    }

    if (req.body.capacity !== undefined) {
      const bookedSeats = event.capacity - event.seatsRemaining;
      event.capacity = req.body.capacity;
      event.seatsRemaining = Math.max(0, req.body.capacity - bookedSeats)    //doing this because new cap might be less than the number of seats left.
    }

    if (req.body.location) {
      if (req.body.location?.address) event.location.address = req.body.location.address;
      if (req.body.location?.lat !== undefined) event.location.lat = req.body.location.lat;
      if (req.body.location?.lng !== undefined) event.location.lng = req.body.location.lng;
    }

    const updatedEvent = await event.save();
    res.status(200).json({ message: `Event ${updatedEvent._id.toString()} updated successfully` });
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server error" })
  }
}

export const deleteEvent = async (req, res) => {
  if (!req.params.id) return res.status(400).json({ message: "Event ID is required" })
  try {
    const event = await Event.findById(req.params.id)
    if (!event) return res.status(404).json({ message: "Event not found" })
    if (event.createdBy.toString() !== req.userId) {
      return res.status(403).json({ message: "You are not authorised to delete this event" })
    }
    
    // Check for confirmed bookings by comparing capacity and seatsRemaining
    const bookedSeats = event.capacity - event.seatsRemaining

    if (bookedSeats > 0 && !req.body.force) {
      return res.status(409).json({
        message: `This event has ${bookedSeats} confirmed booking(s). Send force: true to confirm deletion.`,
        confirmedBookings: bookedSeats,
      })
    }
    // If force is true or no confirmed bookings exist, delete the event
    await Event.findByIdAndDelete(req.params.id)

    res.status(200).json({ message: `Event deleted successfully` })

  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server error" })
  }
}


export const getAdminEvents = async (req, res) => {
  try {                              // req.userId is a mongoose ObjectId
    const events = await Event.find({ createdBy: req.userId}).sort({ date: 1 }) // sort by date ascending -- soonest first
    if (!events.length) {
      return res.status(200).json({ message: "You have not created any events yet", events: [] })
    }
    res.status(200).json(events)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server error" })
  }
}