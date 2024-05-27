import { Router } from 'express'
const router = Router()

import * as exhibitController from '../controllers/exhibit.controller'
import {authJwt} from '../middlewares/index'

//router.post('/', [authJwt.verifyToken, authJwt.isEditor], exhibitController.createExhibit)
router.post('/', exhibitController.createExhibit)

router.get('/', exhibitController.getExhibits)

router.get('/:exhibitId', exhibitController.getExhibitById)
router.put('/:exhibitId', exhibitController.updateExhibitById)
router.delete('/:exhibitId', exhibitController.deleteExhibitById)

router.get('/ids/:exhibitIds',exhibitController.getExhibitByIds)

export default router