import { Router } from 'express'

import getUsers from './users.controllers'
import checkAuth from '../../auth/middleware/checkAuth'

const router = Router()

router.route('/').get(checkAuth, getUsers)

export default router
