import express from "express";
import {createEvent,updateEvent,deleteEvent,getAdminEvents} from '../../../controller/eventController.js'
import verifyRole from "../../../middleware/verifyRoles.js";

const router = express.Router();
router.route('/')
  .get(verifyRole('admin'),getAdminEvents)
  .post( verifyRole('admin'), createEvent)

router.route('/:id')
  .put(verifyRole('admin'),updateEvent)
  .delete(verifyRole('admin'),deleteEvent)
export default router;

