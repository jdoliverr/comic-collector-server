const express = require('express')
const CollectionService = require('./collection-service')

const collectionRouter = express.Router()

collectionRouter
    .route('/')

module.exports = collectionRouter