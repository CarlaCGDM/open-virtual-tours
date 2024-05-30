import { Router } from 'express'
const router = Router()

import * as configController from '../controllers/config.controller.js'
import {authJwt} from '../middlewares/index.js'

router.get('/', settingsController.getSettings)

router.put('/:settingId', [authJwt.verifyToken, authJwt.isEditor], settingsController.updateSettingById)

export default router