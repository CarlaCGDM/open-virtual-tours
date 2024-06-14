import { Router } from 'express'
const router = Router()

import * as configController from '../controllers/config.controller.js'
import {authJwt} from '../middlewares/index.js'

router.get('/', configController.getConfig)

router.put('/:configId', configController.updateConfig)

//router.put('/:configId', [authJwt.verifyToken, authJwt.isEditor], configController.updateConfig)

export default router