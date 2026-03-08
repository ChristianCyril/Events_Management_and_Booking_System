import bcrypt from "bcrypt"
import User from '../model/User.js'

const handleRegistration = async (req, res)=>{
  if(!req.body.firstname || !req.body.firstname) return res.status(400).json({"message": "Enter first and Last Name"});
  if(!req.body.email) return res.status(400).json({"message": "Enter your Email"});
  if(!req.body.password) return res.status(400).json({"message": "Enter a password"});
  //hashing password
  const hashedPassword = await bcrypt.hash(req.body.password,10);
  //check for duplicate email
  const result = await User.findOne({email: req.body.email});
  if(result) return res.status(409).json('this email has been taken already')
  //create and save new user
  try{
    const newUser = await User.create(
      {
        firstname:req.body.firstname,
        lastname:req.body.lastname,
        email: req.body.email,
        password: hashedPassword
      });
      res.status(200).json({newUser});
  }catch(error){
      console.error(error);
  }
}

export default handleRegistration;