

const CollectionService = {
    getAllComics(db) {
        return db
            .select('*')
            .from('comic_collector_collection')
            .orderBy('id');
    },
    getUserComics(db, user_id) {
        return db
            .select('*')
            .from('comic_collector_collection')
            .where({ user_id })
            .orderBy('id');
    },
    insertComic(db, newComic) {
        return db
            .insert(newComic)
            .into('comic_collector_collection')
            .returning('*')
            .then(rows => {
                return rows[0]
            });
    },
    getById(db, id) {
        return db
            .select('*')
            .from('comic_collector_collection')
            .where({ id })
            .first();
    },
    deleteComic(db, id) {
        return db('comic_collector_collection')
            .where({ id })
            .delete();
    },
    updateComic(db, id, newComicFields) {
        return db('comic_collector_collection')
            .where({ id })
            .update(newComicFields);
    },
}

module.exports = CollectionService;





// serializeComic(comic) {
//         const comicTree = new Treeize()

//         const comicData = comicTree.grow([ comic ]).getData()[0]

//         return {
//             id: comicData.id,
//             title: xss(comicData.title),
//             author: xss(comicData.author),
//             read: comicData.read,
//             description: xss(comicData.description)
//         }
//     },

//     serializeComics(comics) {
//         return comics.map(this.serializeComic)
//     },