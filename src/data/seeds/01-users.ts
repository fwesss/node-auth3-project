import Knex, { QueryBuilder } from 'knex'
import bcrypt from 'bcrypt'

exports.seed = (knex: Knex): QueryBuilder =>
  knex('users').insert([
    {
      username: 'BurritoMan',
      password: bcrypt.hashSync('password', 10),
      department: 'Shoes',
    },
    {
      username: 'Poptart',
      password: bcrypt.hashSync('password', 10),
      department: 'Accounting',
    },
    {
      username: 'Orangejuice',
      password: bcrypt.hashSync('password', 10),
      department: 'Web Development',
    },
    {
      username: 'Conrad',
      password: bcrypt.hashSync('password', 10),
      department: 'Web Development',
    },
    {
      username: 'Tuna',
      password: bcrypt.hashSync('password', 10),
      department: 'Treats',
    },
    {
      username: 'Scout',
      password: bcrypt.hashSync('password', 10),
      department: 'Treats',
    },
    {
      username: 'Diz',
      password: bcrypt.hashSync('password', 10),
      department: 'Marketing',
    },
  ])
