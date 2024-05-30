import { Router } from 'express'
const router = Router()

import * as userController from '../controllers/user.controller.js'
import { authJwt, verifySignup } from '../middlewares/index.js';

// router.post('/', [
//     authJwt.verifyToken,
//     authJwt.isEditor,
//     verifySignup.checkRolesExist
// ],userController.createUser)

router.get('/', userController.getUsers)
router.get('/:userId', userController.getUsersById)
router.put('/:userId', userController.updateUsertById)
router.delete('/:userId', userController.deleteUserById)

export default router