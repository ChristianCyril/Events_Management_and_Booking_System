import Event from "../../model/Event.js";

const handleGetEvents = async (req, res) => {
  try {
    const events = await Event.find().exec();
    if(events){
      res.status(200).json(events)
    }
  }catch(error){
    console.error(error)
  }
}

export default handleGetEvents