import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
   {
    firstname: {
      type: String,
      required: [true, 'Firstname is required'],
      trim: true,                                   //removes whitespaces
      minlength: [2, 'Name must be at least 2 characters'],
      maxlength: [50, 'Name cannot exceed 50 characters'],
    },
    lastname: {
      type: String,
      required: [true, 'Lastname is required'],
      trim: true,                                   //removes whitespaces
      minlength: [2, 'Name must be at least 2 characters'],
      maxlength: [50, 'Name cannot exceed 50 characters'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      trim: true,
      lowercase: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,})+$/,
        'Please provide a valid email address',
      ],
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [6, 'Password must be at least 6 characters'],
    },
    role: {
      type: String,
      enum: ['user', 'admin'],  //meaning value can either be user or admin
      default: 'user',
    },
    refreshToken: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);
export default mongoose.model('User',userSchema);