const userController = require('./user.controller')
const router = require('express').Router()
const reqBodyValidators = require('../../middlewares/reqBodyValidators')

router.post('/register', reqBodyValidators.validate('register'), userController.register)

router.post('/login', reqBodyValidators.validate('login'), userController.login)

module.exports = router
