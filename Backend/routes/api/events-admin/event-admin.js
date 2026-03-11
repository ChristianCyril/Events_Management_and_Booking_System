import express from "express";
import {createEvent} from '../../../controller/eventController.js'
import verifyRole from "../../../middleware/verifyRoles.js";

const router = express.Router();
router.route('/')
  .post( verifyRole('admin'), createEvent);

export default router;

