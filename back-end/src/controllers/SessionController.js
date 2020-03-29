const connection = require('../database/connection')

async function create ( req, res ) {
    const { id } = req.body

    const ong = await connection( 'ongs' )
        .where( 'id', id )
        .select( 'name' )
        .first()

    if ( !ong )
        return res.status(400).json({ error: "Ong não encontrada" })

    return res.json( ong )
}

module.exports = {
    create
}
