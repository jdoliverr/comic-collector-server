const express = require('express')
const AuthService = require('./auth-service')
const {requireAuth} = require('../middleware/jwt-auth')

const authRouter = express.Router()
const jsonBodyParser = express.json()

authRouter
    .post('/login', jsonBodyParser, (req, res, next) => {
        const { user_name, password } = req.body
        const loginUser = { user_name, password }
        console.log(1)
        for (const [key, value] of Object.entries(loginUser))
            if (value == null)
                return res.status(400).json({
                    error: `Missing '${key}' in request body`
                })
                console.log(2)
        AuthService.getUserWithUserName(
            req.app.get('db'),
            loginUser.user_name
        )
            .then(dbUser => {
                console.log('user', dbUser)
                if (!dbUser)
                    return res.status(400).json({
                        error: 'Incorrect user_name or password',
                    })
                    
                return AuthService.comparePasswords(loginUser.password, dbUser.password)
                    .then(compareMatch => {
                        console.log(compareMatch, 3)
                        if (!compareMatch) {
                            res.statusMessage = 'message'
                            return res.status(400).json({
                                error: 'Incorrect user_name or password',
                            })
                        }
                        // res.send('ok')
                        const sub = dbUser.user_name
                        const payload = { user_id: dbUser.id }
                        res.send({
                            user_id: payload.user_id,
                            authToken: AuthService.createJwt(sub, payload),
                        })
                    })
            })
            .catch(next)
    })

module.exports = authRouter