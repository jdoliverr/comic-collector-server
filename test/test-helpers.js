const bcrypt = require('bcryptjs');

function makeComicsFixtures() {
    const testUsers = makeUsersArray();
    const testThings = makeCollectionArray(testUsers);
    const testReviews = makeWishlistArray(testUsers, testThings);
    return { testUsers, testThings, testReviews };
};

function cleanTables(db) {
    return db.raw(
        `TRUNCATE
        comic_collector_collection,
        comic_collector_users,
        comic_collector_wishlist
        RESTART IDENTITY CASCADE`
    );
};

function seedUsers(db, users) {
    const preppedUsers = users.map(user => ({
        ...user,
        password: bcrypt.hashSync(user.password, 1)
    }));

    return db.into('comic_collector_users').insert(preppedUsers)
        .then(() =>
            db.raw(`SELECT setval('comic_collector_users_id_seq', ?)`, [preppedUsers[preppedUsers.length - 1].id])
        );
};

function makeUsersArray() {
    return [
        {
            user_name: 'testuser1',
            password: 'Testpassword00!'
        },
        {
            user_name: 'testuser2',
            password: 'Testpassword00@'
        },
        {
            user_name: 'testuser3',
            password: 'Testpassword00#'
        }
    ];
};

function makeCollectionArray() {
    return [
        {
            title: 'title1',
            author: 'author1',
            issue: 1,
            is_read: true,
            description: 'description1'
        },
        {
            title: 'title2',
            author: 'author2',
            issue: 2,
            is_read: true,
            description: 'description2'
        },
        {
            title: 'title3',
            author: 'author3',
            issue: 3,
            is_read: true,
            description: 'description3'
        }
    ];
};

function makeWishlistArray() {
    return [
        {
            title: 'title1',
            author: 'author1',
            issue: 1,
            is_read: true,
            description: 'description1'
        },
        {
            title: 'title2',
            author: 'author2',
            issue: 2,
            is_read: true,
            description: 'description2'
        },
        {
            title: 'title3',
            author: 'author3',
            issue: 3,
            is_read: true,
            description: 'description3'
        }
    ];
};

module.exports = {
    seedUsers,
    cleanTables,
    makeComicsFixtures
};