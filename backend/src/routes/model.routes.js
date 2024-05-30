import { Router } from 'express'
const router = Router()

import * as ModelController from '../controllers/Model.controller.js'
import {authJwt} from '../middlewares/index.js'

//router.post('/', [authJwt.verifyToken, authJwt.isEditor], ModelController.createModel)
router.post('/', ModelController.createModel)

router.get('/', ModelController.getModels)

router.get('/:ModelId', ModelController.getModelById)
router.put('/:ModelId', ModelController.updateModelById)
router.delete('/:ModelId', ModelController.deleteModelById)

router.get('/ids/:ModelIds',ModelController.getModelByIds)

export default router