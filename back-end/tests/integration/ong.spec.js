const request = require( 'supertest' )
const app = require( '../../src/app.js' )
const connection = require('../../src/database/connection')

describe( 'ONG', () => {
    beforeEach( async () => {
        await connection.migrate.rollback()
        await connection.migrate.latest()
    });

    afterAll( async () => {
        await connection.destroy()
    })

    it('should be able to create a new ONG', async () => {

        const response = await request(app)
            .post( '/ongs' )
            .send({
                name: "Testando",
                email: "ong@ong.com",
                whatsapp: "11900001111",
                city: "São Paulo",
                uf: "SP"
            });

        expect( response.body ).toHaveProperty( 'id' )
        expect( response.body.id ).toHaveLength( 8 )

    })
});
