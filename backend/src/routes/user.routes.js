import { Router } from 'express'
const router = Router()

import * as userController from '../controllers/user.controller'
import { authJwt, verifySignup } from '../middlewares';

router.post('/', [
    authJwt.verifyToken,
    authJwt.isEditor,
    verifySignup.checkRolesExist
],userController.createUser)

router.get('/', userController.getUsers)

export default router