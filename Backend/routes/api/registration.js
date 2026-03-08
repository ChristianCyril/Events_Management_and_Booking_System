import express from 'express';
import handleRegistration from '../../controller/registrationController.js';

const router = express.Router();
router.post('/',handleRegistration);

export default router;
