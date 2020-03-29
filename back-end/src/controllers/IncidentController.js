const connection = require( '../database/connection' )

async function create ( req, res ) { 
    const { title, description, value } = req.body
    const ong_id = req.headers.authorization

    const [id] = await connection( 'incidents' ).insert({
        title,
        description,
        value,
        ong_id
    })

    return res.json({ id })
}

async function index ( req, res ) {
    const { page = 1 } = req.query
    const amount = 5
    
    const [totalCount] = await connection( 'incidents' ).count()
    const incidents = await connection( 'incidents' )
        .join( 'ongs', 'ongs.id', '=', 'incidents.ong_id' ) 
        .limit( amount )
        .offset( ( page-1 ) * amount )
        .select([
            'incidents.*',
            'ongs.name',
            'ongs.email',
            'ongs.whatsapp',
            'ongs.city',
            'ongs.uf'
        ])
    
    res.header( 'X-Total-Count', totalCount['count(*)'] )
    return res.json(incidents)
}

async function remove ( req, res ) { 
    const { id } = req.params
    const ong_id = req.headers.authorization

    const incident = await connection( 'incidents' )
        .select( 'ong_id' )
        .where( 'id', id )
        .first()

    if ( incident.ong_id !== ong_id )
        res.status(401).json({ error: "Operação não permitida." })

    await connection( 'incidents' )
        .where( 'id', id )
        .delete()

    return res.status(201).send()
}

module.exports = {
    index,
    create,
    remove
}
