import express from 'express';
import handleAuthentication from "../../controller/authController.js";

const router = express.Router();
router.post('/',handleAuthentication);

export default router;