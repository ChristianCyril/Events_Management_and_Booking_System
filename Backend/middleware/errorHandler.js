import logEvents from "../utils/logEvents.js";

const errorHandler = (req,res,next,err)=>{
  logEvents(`${err.name}:\t${err.message}`,'errorLog.txt');
  console.error(err.stack),
  res.status(500).send(err.message);
}
export default errorHandler