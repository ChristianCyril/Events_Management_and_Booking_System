import express from "express";
import {handleGetEvents,handleSingleEvent} from '../../controller/eventController.js'


const router = express.Router();
router.route('/')
  .get(handleGetEvents);

router.get('/:id',handleSingleEvent)
export default router;

