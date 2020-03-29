const knex  = require('knex')
const configuration = require('../../knexfile.js')

const env = process.env.NODE_ENV || 'development'
const connection = knex( configuration[env] )

module.exports = connection