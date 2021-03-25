const mongoose = require('mongoose')
require('dotenv').config()

const connect = function () {
    mongoose.connect(process.env.DB_URI, {useNewUrlParser: true, useUnifiedTopology: true})

    mongoose.connection.on('connected', (err) => console.log("DB connected successfully..."))
}

module.exports = {
    connect
}
