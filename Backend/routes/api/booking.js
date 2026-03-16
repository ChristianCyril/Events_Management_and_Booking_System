import express from 'express'
import {createBooking,cancelBooking,getMyBookings} from '../../controller/bookingController.js'

const router = express.Router()

router.post('/',createBooking)

router.route('/:id')
  .patch(cancelBooking)
  .get(getMyBookings)

export default router