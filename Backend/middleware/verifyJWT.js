import jwt from 'jsonwebtoken';

const verifyJWT = (req,res,next)=>{
  const authHeader = req.headers.authorization || req.headers.Authorization;;
  if(!authHeader?.startsWith('Bearer ')) return res.sendStatus(401);
  const token = authHeader.split(' ')[1];
  //verify token
  jwt.verify(
    token,
    process.env.ACCESS_TOKEN_SECRET,
    (error,decoded)=>{
      if(error) return res.sendStatus(401);
      req.role = decoded.role;
      req.id = decoded.id;
      next();
    }
  );
}

export default verifyJWT;
