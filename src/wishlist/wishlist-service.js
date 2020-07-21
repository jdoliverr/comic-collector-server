

const WishlistService = {
    getAllComics(db) {
        return db
            .select('*')
            .from('comic_collector_wishlist');
    },
    getUserComics(db, user_id) {
        return db
            .select('*')
            .from('comic_collector_wishlist')
            .where({ user_id })
            .orderBy('id');
    },
    insertComic(db, newComic) {
        return db
            .insert(newComic)
            .into('comic_collector_wishlist')
            .returning('*')
            .then(rows => {
                return rows[0]
            });
    },
    getById(db, id) {
        return db
            .select('*')
            .from('comic_collector_wishlist')
            .where({ id })
            .first();
    },
    deleteComic(db, id) {
        return db('comic_collector_wishlist')
            .where({ id })
            .delete();
    },
    updateComic(db, id, newComicFields) {
        return db('comic_collector_wishlist')
            .where({ id })
            .update(newComicFields);
    },
}

module.exports = WishlistService;