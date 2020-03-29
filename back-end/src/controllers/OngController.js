const connection = require( '../database/connection' )
const generateUniqueId = require( '../utils/generateUniqueId' )

async function index ( req, res ) {
    const ongs = await connection( 'ongs' ).select( '*' )
    return res.json( ongs )
}

async function create ( req, res ) {
    const { name, email, whatsapp, city, uf } = req.body
    const id = generateUniqueId()

    await connection( 'ongs' ).insert({
        id,
        name,
        email, 
        whatsapp, 
        city,
        uf
    })

    return res.json({ id })
}

module.exports = {
    index,
    create
}
