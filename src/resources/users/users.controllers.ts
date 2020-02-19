import { Request, Response, NextFunction } from 'express'

import { find } from './users.model'
import { DatabaseError } from '../../server/middleware/errorHandler'

const getUsers = async (
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const users = await find()
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
