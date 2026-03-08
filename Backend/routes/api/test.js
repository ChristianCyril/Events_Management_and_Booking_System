import express from 'express';
import verifyRole from '../../middleware/verifyRoles.js'

const router = express.Router();
router.get('/',verifyRole('admin'),(req,res)=>{
  res.status(200).json('test passed')
});

export default router;