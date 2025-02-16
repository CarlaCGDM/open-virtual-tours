import { Router } from 'express'
const router = Router()

import * as themeController from '../controllers/theme.controller.js'
import {authJwt} from '../middlewares/index.js'

//router.post('/', [authJwt.verifyToken, authJwt.isEditor], themeController.createTheme)
router.post('/', themeController.createTheme)

router.get('/', themeController.getThemes)

router.get('/:themeId', themeController.getThemeById)
router.put('/:themeId', themeController.updateThemeById)
router.delete('/:themeId', themeController.deleteThemeById)

export default router