import { Router } from 'express'
const router = Router()

import * as modelController from '../controllers/model.controller.js'
import {authJwt} from '../middlewares/index.js'

//router.post('/', [authJwt.verifyToken, authJwt.isEditor], modelController.createModel)
router.post('/', modelController.createModel)

router.get('/', modelController.getModels)

router.get('/:modelId', modelController.getModelById)
router.put('/:modelId', modelController.updateModelById)
router.delete('/:modelId', modelController.deleteModelById)

router.get('/ids/:modelIds',modelController.getModelByIds)

export default router