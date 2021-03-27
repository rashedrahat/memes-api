const userController = require('./user.controller')
const router = require('express').Router()
const reqBodyValidators = require('../../middlewares/reqBodyValidators')

router.post('/register', reqBodyValidators.validate('register'), userController.register)

router.post('/login', reqBodyValidators.validate('login'), userController.login)

router.post('/token', function (req, res) {
    const {token} = req.body
    if (token !== undefined || token !== null) {
        req.session.memesAuthToken = token
        res.status(200).json({success: true})
    } else {
        res.status(400).json({
            success: false,
            message: "Invalid token.",
        })
    }
});

module.exports = router
