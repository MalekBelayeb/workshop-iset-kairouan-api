const route = require('express').Router()

const userController = require('../controllers/user-controller')

route.post('/v1/user/register', userController.register)
route.post('/v1/user/login' , userController.signin ) ;

module.exports = route