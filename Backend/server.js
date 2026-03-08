import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import connectDB from './config/connectDB.js';
import corsOption from './config/corsOption.js'

connectDB();
const app = express();
const PORT = process.env.PORT || 3500;
//middlewares
app.use(cors(corsOption));
app.use(express.json());



mongoose.connection.once('open',()=>{
  app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`);
  })
})