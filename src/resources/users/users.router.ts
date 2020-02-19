import { Router } from 'express'

import getUsers from './users.controllers'

const router = Router()

router.route('/').get(getUsers)

export default router
