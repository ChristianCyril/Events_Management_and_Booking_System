import express from "express";
import createEvent from "../../../controller/events/createEvent.js";
import verifyRole from "../../../middleware/verifyRoles.js";

const router = express.Router();

router.post('/',verifyRole('admin'),createEvent);

export default router;