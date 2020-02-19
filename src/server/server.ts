import express, { json } from 'express'
import helmet from 'helmet'
import morgan from 'morgan'
import cors from 'cors'

import apiRouter from '../api/api.router'

const server = express()

server.use(helmet(), morgan('dev'), json(), cors())

server.use('/api', apiRouter)

export default server
