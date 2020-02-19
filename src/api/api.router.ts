import { Router } from 'express'
import controllers from './api.controllers'

const router = Router()

router.route('/').get(controllers.apiRoot)

export default router
