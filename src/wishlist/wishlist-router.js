const express = require('express')
const path = require('path')
const WishlistService = require('./wishlist-service')

const wishlistRouter = express.Router()
const jsonBodyParser = express.json()

wishlistRouter
    .route('/')


module.exports = wishlistRouter