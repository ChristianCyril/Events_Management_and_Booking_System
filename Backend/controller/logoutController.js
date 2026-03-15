import User from "../model/User.js";

const handleLogout= async (req,res)=>{
  if(!req.cookies?.jwt) return res.sendStatus(204);
  const refreshToken = req.cookies.jwt;
  //verify if token exist
  const foundUser = await User.findOne({refreshToken:refreshToken}).exec();
  if(!foundUser){
    res.clearCookie('jwt',{httpOnly: true, sameSite: 'None',secure: true});
    return res.sendStatus(204);
  }
  foundUser.refreshToken = '';
  await foundUser.save();
  res.clearCookie('jwt',{httpOnly: true, sameSite: 'None',secure: true});
  res.sendStatus(204);
}

export default handleLogout;