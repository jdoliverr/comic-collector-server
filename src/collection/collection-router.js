const express = require('express');
const CollectionService = require('./collection-service');
const { requireAuth } = require('../middleware/jwt-auth');

const collectionRouter = express.Router();
const jsonBodyParser = express.json();

collectionRouter
    .route('/')
    // .all(requireAuth)
    .get((req, res, next) => {
        CollectionService.getUserComics(req.app.get('db'), req.user.id)
            .then(comics => {
                res.json(comics);
            })
            .catch(next)
    });

collectionRouter
    .route('/')
    // .all(requireAuth)
    .post(jsonBodyParser, (req, res, next) => {
        const { comic_title, comic_author, is_read, description, user_id, issue } = req.body;
        const newComic = { comic_title, comic_author, is_read, description, user_id, issue };

        for (const [key, value] of Object.entries(newComic))
            if (value == null)
                return res.status(400).json({
                    error: `Missing '${key}' in request body`
                });

        CollectionService.insertComic(
            req.app.get('db'),
            newComic
        )
            .then(comic => {
                res.json(comic)
            })
            .catch(next);
    });

collectionRouter
    .route('/:id')
    .all(requireAuth)
    .delete((req, res, next) => {
        
        CollectionService.deleteComic(
            req.app.get('db'),
            req.params.id
        )
            .then(() => {
                res.status(204).end();
            })
            .catch(next);
    })
    .patch(jsonBodyParser, (req, res, next) => {
        const { is_read } = req.body;
        const comicToUpdate = { is_read };

        CollectionService.updateComic(
            req.app.get('db'),
            req.params.id,
            comicToUpdate
            )
            .then(comic => {
                res.json(comic);
            })
            .then(() => {
            res.status(204).end();
            })
            .catch(next);
    });
    
module.exports = collectionRouter;