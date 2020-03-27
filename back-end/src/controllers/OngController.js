import connection from '../database/connection'
import crypto from 'crypto'

async function index ( req, res ) {
    const ongs = await connection( 'ongs' ).select( '*' )
    return res.json( ongs )
}

async function create ( req, res ) {
    const { name, email, whatsapp, city, uf } = req.body
    const id = crypto.randomBytes(4).toString('HEX')

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

export default {
    index,
    create
}
