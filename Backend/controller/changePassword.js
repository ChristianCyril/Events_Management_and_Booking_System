import bcrypt from "bcrypt"
import User from "../model/User.js"

const handleChangePassword = async (req,res)=>{
  if(!req.userId ) return res.status(400).json({"message": 'User ID required'})
  if(!req.body.currentPassword) return res.status(400).json({"message": 'Current Password Required'})
  if(!req.body.newPassword) return res.status(400).json({"message": 'New Password Required'})
  
  const foundUser = await User.findById(req.userId );
  if(!foundUser) return res.status(404).json({"message": 'User Notfound'})
  
  const foundUserPassword = foundUser.password
  const match = await bcrypt.compare(req.body.currentPassword,foundUserPassword)
  if(!match) return res.status(401).json({"message": 'Current password incorrect'})
  
  const hashedNewPassword = await bcrypt.hash(req.body.newPassword,10)
  foundUser.password = hashedNewPassword
  try{
    await foundUser.save()
    res.status(200).json({"message": 'Password Modified Succesfully'})
  }catch(error){
    res.status(500).json({"message": `${error.name}`})
  }
  
  
}

export default  handleChangePassword