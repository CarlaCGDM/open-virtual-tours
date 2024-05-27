import { Router } from 'express'
const router = Router()

import * as settingsController from '../controllers/globalsettings.controller'
import {authJwt} from '../middlewares/index'

router.post('/', [authJwt.verifyToken, authJwt.isEditor], settingsController.createSetting)

router.get('/', settingsController.getSettings)

router.get('/:settingId', settingsController.getSettingById)
router.put('/:settingId', [authJwt.verifyToken, authJwt.isEditor], settingsController.updateSettingById)
router.delete('/:settingId', [authJwt.verifyToken, authJwt.isEditor], settingsController.deleteSettingById)

export default router

// Dejamos abierta la posibilidad de incorporar más global settings pero no las implementamos