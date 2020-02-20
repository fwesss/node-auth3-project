import { Request, Response, NextFunction } from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import Users, { User } from '../resources/users/users.model'
import guaranteedPromise from '../utils/guaranteedPromise'
import {
  UnauthorizedError,
  DatabaseError,
} from '../server/middleware/errorHandler'
import jwtSecret from '../secrets'

const generateToken = ({ id, username, department }: User): string =>
  jwt.sign(
    {
      subject: id,
      username,
      department,
    },
    jwtSecret,
    {
      expiresIn: '1d',
    }
  )

const register = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const user = req.body

  const hash = bcrypt.hashSync(user.password, 10)
  const hashedUser = { ...user, password: hash }

  const registeredUser = await guaranteedPromise(Users.insert(hashedUser))

  return registeredUser.ok
    ? res.status(201).json({
        user: registeredUser.data,
        token: generateToken(registeredUser.data),
      })
    : next(
        new DatabaseError({
          message: 'Registration failed',
          dbMessage: registeredUser.error,
        })
      )
}

const login = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { username, password } = req.body

  try {
    const userToLogin = await Users.findBy({ username }).first()

    if (userToLogin && bcrypt.compareSync(password, userToLogin.password)) {
      res.status(200).json({
        message: `Welcome ${username}!`,
        token: generateToken(userToLogin),
      })
    } else {
      next(new UnauthorizedError({ message: 'You shall not pass!' }))
    }
  } catch (error) {
    next(
      new DatabaseError({
        message: 'Login failed',
        dbMessage: error,
      })
    )
  }
}

export default {
  register,
  login,
}
