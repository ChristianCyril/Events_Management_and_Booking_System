import express from "express";
import handleGetEvents from "../../controller/event/getEventsController.js";

const router = express.Router();
router.route('/')
  .get(handleGetEvents);

export default router;

