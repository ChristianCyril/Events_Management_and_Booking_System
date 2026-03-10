import Event from "../../model/Event.js";

const createEvent = async (req, res) => {
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
    if(newEvent){
      res.status(201).json({"message": `Event ${newEvent._id.toString()} created successfully`})
    }
  }catch(error){
    console.error(error)
  }
}

export default createEvent