import express from 'express';
import handleRefresh from '../../controller/authentication/refreshTokenController.js';

const router = express.Router();
router.get('/',handleRefresh);

export default router;