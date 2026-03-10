import mongoose from "mongoose"

const locationSchema = new mongoose.Schema({
  address: {
    type: String,
    required: [true, 'Address is required'],
    trim: true,
  },
  lat: {
    type: Number,
    required: [true, 'Latitude is required'],
  },
  lng: {
    type: Number,
    required: [true, 'Longitude is required'],
  },
})

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
      minlength: [3, 'Title must be at least 3 characters'],
      maxlength: [100, 'Title cannot exceed 100 characters'],
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true,
      minlength: [10, 'Description must be at least 10 characters'],
      maxlength: [1000, 'Description cannot exceed 1000 characters'],
    },
    date: {
      type: Date,
      required: [true, 'Date is required'],
      validate: {
        validator: function (value) {
          return value > new Date()
        },
        message: 'Event date must be in the future',
      },
    },
    time: {
      type: String,
      required: [true, 'Time is required'],
      match: [
        /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/,
        'Time must be in HH:MM format',
      ],
    },
    location: {
      type: locationSchema,
      required: [true, 'Location is required'],
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: [0, 'Price cannot be negative'],
    },
    capacity: {
      type: Number,
      required: [true, 'Capacity is required'],
      min: [1, 'Capacity must be at least 1'],
    },
    seatsRemaining: {
      type: Number,
      min: [0, 'Seats remaining cannot be negative'],
    },
    maxBookingsPerUser: {
      type: Number,
      required: [true, 'Max bookings per user is required'],
      min: [1, 'Max bookings per user must be at least 1'],
      validate: {
        validator: function (value) {
          return value <= this.capacity
        },
        message: 'Max bookings per user cannot exceed total capacity',
      },
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

// Automatically set seatsRemaining to capacity when event is first created
/* It acts like an automatic "trigger" that runs internal logic every time an 
Event document is about to be written to MongoDB.(Mongoose Middleware) */
eventSchema.pre('save', function (next) {
  if (this.isNew) {
    this.seatsRemaining = this.capacity
  }
  next()
})

export default mongoose.model('Event', eventSchema);