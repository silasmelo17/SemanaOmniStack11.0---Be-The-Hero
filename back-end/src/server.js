import express from 'express'
import cors from 'cors'
import router from './routes'

const app = express()
const port = 3333

app.use( cors() )
app.use( express.json() )
app.use( router )

app.listen( port, err => {
    if ( err ) throw err
    console.log( `Servidor aberto na porta ${port}: http://localhost:${port}` )
})
