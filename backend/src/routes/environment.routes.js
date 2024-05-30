import { Router } from 'express'
const router = Router()

import * as environmentController from '../controllers/environment.controller.js'
import {authJwt} from '../middlewares/index.js'

router.post('/', environmentController.createEnvironment)

router.get('/', environmentController.getEnvironments)

router.get('/:environmentId', environmentController.getEnvironmentById)
router.put('/:environmentId', environmentController.updateEnvironmentById)
router.delete('/:environmentId', environmentController.deleteEnvironmentById)

export default router