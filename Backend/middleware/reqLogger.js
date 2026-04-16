import logEvents from "../utils/logEvents.js";

const reqLogger = (req,res,next)=>{
  logEvents(`${req.method}\t${req.headers.origin}\t${req.url}`, 'reqLog.txt');
  next();
}

export default reqLogger