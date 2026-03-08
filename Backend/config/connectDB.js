import mongoose from "mongoose";


const connectDB = async ()=>{
  try{
    await mongoose.connect(process.env.DATABASE_URI);
    console.log("Successfully connected to Database");
  }catch(error){
    console.error(error);
  }
}

export default connectDB;