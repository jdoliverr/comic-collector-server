const express = require('express')
const CollectionService = require('./collection-service')

const collectionRouter = express.Router()
const jsonBodyParser = express.json()

collectionRouter
    .route('/')
    .get((req, res, next) => {
        CollectionService.getAllComics(req.app.get('db'))
            .then(comics => {
                res.json(comics)
            })
            .catch(next)
    })

collectionRouter
    .route('/')    
    .post(jsonBodyParser, (req, res, next) => {
        const { comic_title, comic_author, is_read, description, user_id } = req.body
        const newComic = { comic_title, comic_author, is_read, description, user_id }

        for (const [key, value] of Object.entries(newComic))
            if (value == null)
                return res.status(400).json({
                    error: `Missing '${key}' in request body`
                })

        CollectionService.insertComic(
            req.app.get('db'),
            newComic
        )
            .then(comic => {
                res.json(comic)
            })
            .catch(next)
    })

collectionRouter
    .route('/:id')
    .delete((req, res, next) => {
        console.log(req.params)
        CollectionService.deleteComic(
            req.app.get('db'),
            req.params.id
        )
            .then(() => {
                res.status(204).end()
            })
            .catch(next)
    })

module.exports = collectionRouter