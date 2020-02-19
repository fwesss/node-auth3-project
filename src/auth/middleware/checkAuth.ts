import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

import { UnauthorizedError } from '../../server/middleware/errorHandler'
import { ValidationError } from '../../utils/validator'
import secret from '../../secrets'

interface AuthorizedRequest extends Request {
  decodedJwt: string | object
}

const instanceOfAuthorizedRequest = (
  object: Request
): object is AuthorizedRequest => 'decodedJwt' in object

const checkAuth = (
  req: Request | AuthorizedRequest,
  _res: Response,
  next: NextFunction
): void => {
  const token = req.headers.authorization

  if (instanceOfAuthorizedRequest(req)) {
    next()
  } else if (token) {
    jwt.verify(token, secret, (error, decodedJwt) => {
      if (error) {
        next(new UnauthorizedError({ message: 'You shall not pass!' }))
      } else if (instanceOfAuthorizedRequest(req)) {
        req.decodedJwt = decodedJwt
      } else {
        next()
      }
    })
  } else {
    next(
      new ValidationError('Failed to authenticate', [
        'Missing authentication token',
      ])
    )
  }
}
export default checkAuth
