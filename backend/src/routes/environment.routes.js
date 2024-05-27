import { Router } from 'express'
const router = Router()

import * as environmentController from '../controllers/environment.controller'
import {authJwt} from '../middlewares/index'

router.post('/', environmentController.createEnvironment)

router.get('/', environmentController.getEnvironments)

router.get('/selected', environmentController.getSelectedEnvironment)
router.put('/select/:environmentId',environmentController.selectEnvironmentById)

router.get('/:environmentId', environmentController.getEnvironmentById)
router.put('/:environmentId', environmentController.updateEnvironmentById)
router.delete('/:environmentId', environmentController.deleteEnvironmentById)

export default router