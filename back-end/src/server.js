const app = require( './app.js' )
const port = 3333

app.listen( port, err => {
    if ( err ) throw err
    console.log( `Servidor aberto na porta ${port}: http://localhost:${port}` )
})
