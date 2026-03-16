import express from 'express'
import {createBooking,cancelBooking,getMyBookings} from '../../controller/bookingController.js'

const router = express.Router()

router.post('/',createBooking)
router.get('/',getMyBookings)
router.patch('/:id',cancelBooking)


export default router