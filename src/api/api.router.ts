import { Router } from 'express'

import controllers from './api.controllers'
import usersRouter from '../resources/users/users.router'

const router = Router()

router.use('/users', usersRouter)

router.route('/').get(controllers.apiRoot)

export default router
