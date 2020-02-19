import knex from 'knex'

// eslint-disable-next-line node/no-missing-require
const config = require('../../knexfile').development

export default knex(config)
