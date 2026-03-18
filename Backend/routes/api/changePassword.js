import express from 'express'
import handleChangePassword from '../../controller/changePassword.js'
const router = express.Router()

router.patch('/',handleChangePassword)

export default router 