import express from "express";
import {handleGetEvents,handleSingleEvent} from '../../controller/eventController.js'


const router = express.Router();
router.route('/')
  .get(handleGetEvents);

router.route('/:id')
  .get(handleSingleEvent)
  

export default router;

