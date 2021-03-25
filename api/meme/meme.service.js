const memeModel = require('./meme.model')

const insert = (data) => {
    return memeModel.create(data)
}

const findByShareAbleLink = link => {
    return memeModel.find({shareAbleLink : link})
}

const findByIdAndUpdate = (id, data) => {
    return memeModel.findByIdAndUpdate(id, data)
}

const findAll = () => {
    return memeModel.find({}, {memeImageName: 1, _id: 0}).sort( { 'statistics.viewed': -1 } )
}

module.exports = {
    insert,
    findByShareAbleLink,
    findByIdAndUpdate,
    findAll
}
