const memeModel = require('./meme.model')

const insert = (data) => {
    return memeModel.create(data)
}

const findByConditions = (conditions) => {
    return memeModel.find(conditions)
}

const findByIdAndUpdate = (id, data) => {
    return memeModel.findByIdAndUpdate(id, data)
}

const findAll = (conditions) => {
    return memeModel.find(conditions, {memeName: 1, memeImageName: 1, shareAbleLink: 1, statistics: 1, _id: 0}).sort( { 'statistics.viewed': -1, 'statistics.liked': -1, 'uploadedTime': -1 } )
}

module.exports = {
    insert,
    findByConditions,
    findByIdAndUpdate,
    findAll
}
