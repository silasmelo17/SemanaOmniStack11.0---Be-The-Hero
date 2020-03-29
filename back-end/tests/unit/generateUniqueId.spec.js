
const generateUniqueId = require('../../src/utils/generateUniqueId.js')

describe('Generate unique ID', () => {

    it('Should generate an unique ID', () => {
        const id = generateUniqueId()

        expect( id ).toHaveLength( 8 )
    })

})
