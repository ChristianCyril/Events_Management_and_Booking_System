import express from "express";
import {createEvent,updateEvent,deleteEvent,getAdminEvents} from '../../../controller/eventController.js'
import verifyRole from "../../../middleware/verifyRoles.js";
import { upload } from '../../../config/cloudinary.js'

const router = express.Router();
router.route('/')
  .get(verifyRole('admin'),getAdminEvents)
  .post( verifyRole('admin'),upload.single('image'),createEvent)

router.route('/:id')
  .put(verifyRole('admin'),upload.single('image'),updateEvent)
  .delete(verifyRole('admin'),deleteEvent)
export default router;

