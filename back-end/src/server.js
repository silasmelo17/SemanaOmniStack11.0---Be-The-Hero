import express from 'express'
import Router from './routes/index.js'

const app = express()
const port = 3333

app.use( express.json() )

app.use( Router )

app.listen( port, err => {
    if ( err ) throw err
    console.log( `Servidor aberto na porta ${port}: http://localhost:${port}` )
})
