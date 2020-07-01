const CollectionService = require('../src/collection/collection-service')
const knex = require('knex')

describe('Collection service object', function() {
    let db
    let testComics = [
        {
            id: 1,
            title: 'comic',
            author: 'author',
            read: 'yes',
            description: 'hello',
        },
        {
            id: 1,
            title: 'comic',
            author: 'author',
            read: 'yes',
            description: 'hello',
        },
        {
            id: 1,
            title: 'comic',
            author: 'author',
            read: 'yes',
            description: 'hello',
        },
    ]

    before(() => db('comic_collector_collection').truncate())

    before(() => {
        db = knex({
            client: 'pg',
            connection: process.env.TEST_DATABASE_URL,
        })
    })

    after(() => db.destroy())

    describe(`getAllComics()`, () => {
        it(`resolves all comics from 'comic_collector_collection' table`, () => {

        })
    })
})