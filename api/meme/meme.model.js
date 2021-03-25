const mongoose = require('mongoose')
const Schema = mongoose.Schema

const memeSchema = new Schema({
    memeName: {type: String, required: true},
    memeImageName: {type: String, required: true},
    allowedList: {type: Array, default: []},
    creator: {type: String, required: true},
    uploadedTime: {type: Date, default: Date.now},
    statistics: {type: Object, default: {viewed: 0, liked: 0, blockedRequest: 0}},
    shareAbleLink: {type: String, required: true}
});

const meme = mongoose.model('meme', memeSchema)

module.exports = meme
