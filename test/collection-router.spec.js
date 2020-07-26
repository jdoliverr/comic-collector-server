const knex = require('knex');
const supertest = require('supertest');
const app = require('../src/app');

describe.only('Collection endpoint', function () {
    let db;
    let testComics = [
        {
            comic_title: 'comic',
            comic_author: 'author',
            issue: 10,
            is_read: true,
            description: 'hello',
            user_id: 1,
        },
        {
            id: 1,
            comic_title: 'comic',
            comic_author: 'author',
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
    ];
    let testComic = testComics[0];

    let testUser = {
        id: 1,
        user_name: 'TestUser',
        password: 'Testpassword00!'
    };

    before(() => {
        db = knex({
            client: 'pg',
            connection: process.env.TEST_DATABASE_URL,
        });
        app.set('db', db);
    });
    before('cleanup', () => db('comic_collector_users').truncate());
    beforeEach('insert user', () => {
        return db('comic_collector_users').insert(testUser);
    });
    beforeEach('insert comic', () => {
        return db('comic_collector_collection').insert(testComic);
    });
    before(() => db('comic_collector_collection').truncate());
    afterEach('cleanup', () => db('comic_collector_collection').truncate());
    afterEach('cleanup', () => db('comic_collector_users').truncate());
    after(() => db.destroy());

    describe('POST /api/collection', () => {
        it('should return status 200', () => {
            return supertest(app)
                .post('/api/collection')
                .send(testComic)
                .expect(200);
        });
    });

    describe('GET /api/collection', () => {
        it('should return status 200 and a list of comics', () => {
            return supertest(app)
                .get('/api/collection')
                .expect(200);
        });
    });

    describe('DELETE /api/collection/:id', () => {
        it('should delete comic and return status 204 ', () => {
            return supertest(app)
            .delete(`/api/collection/${testComic.id}`)
            .expect(204);
        });
    });

    describe('PATCH /api/collection/:id', () => {
        it('should update is_read and return status 204', () => {
            return supertest(app)
            .patch(`/api/collection/${testComic.id}`)
            .send({is_read: false})
            .expect(204);
        });
    });
});