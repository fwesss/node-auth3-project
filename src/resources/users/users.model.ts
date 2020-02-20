import { QueryBuilder } from 'knex'

import db from '../../data/dbConfig'

export type User = {
  id: number
  username: string
  password: string
  department: string
}

export const find = (): QueryBuilder =>
  db('users').select('id', 'username', 'department')

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const findBy = (filter: { [key: string]: any }): QueryBuilder =>
  db('users')
    .select('*')
    .where(filter)

const insert = (user: Omit<User, 'id'>): Promise<User> =>
  db('users')
    .insert(user)
    .then(ids => findBy({ id: ids[0] }).first())

export default { find, findBy, insert }
