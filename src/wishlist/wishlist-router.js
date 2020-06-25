const express = require('express')
const WishlistService = require('./wishlist-service')

const wishlistRouter = express.Router()
const jsonBodyParser = express.json()

wishlistRouter
    .route('/')
    .get((req, res, next) => {
        WishlistService.getAllComics(req.app.get('db'))
            .then(comics => {
                res.json(comics)
            })
            .catch(next)
    })

wishlistRouter
    .route('/')
    .post(jsonBodyParser, (req, res, next) => {
        const { comic_title, comic_author, is_read, description, user_id } = req.body
        const newComic = { comic_title, comic_author, is_read, description, user_id }

        for (const [key, value] of Object.entries(newComic))
            if (value == null)
                return res.status(400).json({
                    error: `Missing '${key}' in request body`
                })

        WishlistService.insertComic(
            req.app.get('db'),
            newComic
        )
            .then(comic => {
                res.json(comic)
            })
            .catch(next)
    })

wishlistRouter
    .route('/:id')
    .delete((req, res, next) => {
        WishlistService.deleteComic(
            req.app.get('db'),
            req.params.id
        )
            .then(() => {
                res.status(204).end()
            })
            .catch(next)
    })
    .patch(jsonBodyParser, (req, res, next) => {
        const { is_read } = req.body
        const comicToUpdate = { is_read }

        WishlistService.updateComic(
            req.app.get('db'),
            req.params.id,
            comicToUpdate
            )
            .then(comic => {
                res.json(comic)
            })
            .then(() => {
            res.status(204).end()
            })
            .catch(next)
    })

module.exports = wishlistRouter