import { Router } from 'express'
const router = Router()

import * as productsController from '../controllers/products.controller.js'
import {authJwt} from '../middlewares/index.js'

router.post('/', [authJwt.verifyToken, authJwt.isEditor], productsController.createProduct)

router.get('/', productsController.getProducts)

router.get('/:productId', productsController.getProductById)
router.put('/:productId', [authJwt.verifyToken, authJwt.isEditor], productsController.updateProductById)
router.delete('/:productId', [authJwt.verifyToken, authJwt.isEditor], productsController.deleteProductById)

export default router