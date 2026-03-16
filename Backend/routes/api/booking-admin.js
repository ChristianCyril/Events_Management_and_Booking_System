import express from 'express'
import {getEventBookings} from '../../controller/bookingController.js'

const router = express.Router()

router.get('/:id',getEventBookings)


export default router