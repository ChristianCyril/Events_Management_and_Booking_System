import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import connectDB from './config/connectDB.js';
import corsOption from './config/corsOption.js'
//route imports
import registration from './routes/api/registration.js'
import authentication from './routes/api/auth.js'
import refresh from './routes/api/refresh.js'
import verifyJWT from './middleware/verifyJWT.js';
import test from './routes/api/test.js'
import logout from './routes/api/logout.js'

connectDB();
const app = express();
const PORT = process.env.PORT || 3500;
//middlewares
app.use(cors(corsOption));
app.use(express.json());
app.use(cookieParser());


//routes
app.use('/register',registration);
app.use('/login',authentication);
app.use('/refresh',refresh);
app.use('/logout',logout);
//jwt verification middleware
app.use(verifyJWT);
app.use('/test',test);



mongoose.connection.once('open',()=>{
  app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`);
  })
})