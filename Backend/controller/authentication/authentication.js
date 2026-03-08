import User from "../../model/User.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


const handleAuthentication = async (req,res)=>{
  if(!req.body?.email || !req.body?.password) return res.status(400).json({"message": "Email and Password required"});
  const {email,password}=req.body;
  //finding the user
  const foundUser = await User.findOne({email: email}).exec();
  if(!foundUser) return res.status(401).json({"message": "invalid login credentials"});
  //checking password
  const match = await bcrypt.compare(password,foundUser.password);
  if(!match) return res.status(401).json({"message":"invalid password"});
  // granting access and refresh token 
  const accessToken = jwt.sign(
    {id:foundUser._id.toString(), role:foundUser.role},
    process.env.ACCESS_TOKEN_SECRET,
    {expiresIn: '1h'}
  );
  const refreshToken = jwt.sign(
    {id:foundUser._id.toString()},
    process.env.REFRESH_TOKEN_SECRET,
    {expiresIn: '1d'}
  );
  //sending refresh token as http only cookie
  res.cookie('jwt',refreshToken,{httpOnly: true, sameSite: 'None',/*secure: true,*/maxAge:24*60*60*1000});
  // saving refresh token
  foundUser.refreshToken = refreshToken;
  try{
     const result = await foundUser.save();
     res.status(200).json(accessToken)
  }catch(error){
    console.error(error);
  }
}

export default handleAuthentication;