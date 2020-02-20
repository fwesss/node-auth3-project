import { Response, NextFunction } from 'express'

import { AuthorizedRequest } from '../../auth/middleware/checkAuth'
import { findBy } from './users.model'
import { DatabaseError } from '../../server/middleware/errorHandler'

const getUsers = async (
  req: AuthorizedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const users = await findBy({ department: req.decodedJwt.department })
    res.status(200).json(users)
  } catch (error) {
    next(
      new DatabaseError({
        message: 'Could not retrieve users',
        dbMessage: error,
      })
    )
  }
}

export default getUsers
