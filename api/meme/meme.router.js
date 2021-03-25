const memeController = require('./meme.controller')
const router = require('express').Router()
const reqBodyValidators = require('../../middlewares/reqBodyValidators')
const verifyToken = require('../../middlewares/verifyToken')
const uploadFileMiddleware = require('../../middlewares/fileUpload')

router.post('/add', verifyToken.verifyToken, uploadFileMiddleware, reqBodyValidators.validate('addMeme'), memeController.insertMeme)
router.get('/all', memeController.getMemesList)

module.exports = router
