const express  = require( 'express' )
const cors  = require( 'cors' )
const router  = require( './routes' )
const { errors }  = require( 'celebrate' )

const app = express()

app.use( cors() )
app.use( express.json() )
app.use( router )
app.use( errors() )

module.exports = app