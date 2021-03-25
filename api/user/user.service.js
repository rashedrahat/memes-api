const userModel = require('./user.model')

const create = (data) => {
    return userModel.create(data)
}

const findByEmail = email => {
    return userModel.find({email})
}

module.exports = {
    create,
    findByEmail
}
