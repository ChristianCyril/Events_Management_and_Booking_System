import express from 'express';
import handleAuthentication from "../../controller/authentication/authentication.js";

const router = express.Router();
router.post('/',handleAuthentication);

export default router;