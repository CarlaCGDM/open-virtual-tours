import { Router } from 'express'
const router = Router()

import * as panelController from '../controllers/panel.controller.js'
import {authJwt} from '../middlewares/index.js'

//router.post('/', [authJwt.verifyToken, authJwt.isEditor], panelController.createPanel)
router.post('/', panelController.createPanel)

router.get('/', panelController.getPanels)

router.get('/:panelId', panelController.getPanelById)
router.put('/:panelId', panelController.updatePanelById)
router.delete('/:panelId', panelController.deletePanelById)

router.get('/ids/:panelIds',panelController.getPanelByIds)

export default router