import { Router } from 'express'
const router = Router()

import * as authController from '../controllers/auth.controller'
import {verifySignup} from '../middlewares'

router.post('/signup', [verifySignup.checkDuplicateUsernameOrEmail,verifySignup.checkRolesExist], authController.signUp)
router.post('/signin', authController.signIn)

export default router;