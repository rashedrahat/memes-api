const express = require('express')
const db = require('./config/db')
require('dotenv').config()
const userRouter = require('./api/user/user.router')
const memeRouter = require('./api/meme/meme.router')
const bodyParser = require('body-parser')
const memeService = require('./api/meme/meme.service')

const app = express()

const __basedir = __dirname;
global.app__basedir = __basedir;

db.connect()

app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api/auth', userRouter)
app.use('/api/meme', memeRouter)

app.get('/', async function(req, res) {
    const shareAbleLinkRL = req.protocol + '://' + req.get('host') + req.originalUrl
    const result = await memeService.findByShareAbleLink(shareAbleLinkRL)
    if (result.length == 0) {
        res.status(404).json({
            success: false,
            message: "The shareable link couldn't be found into our record!",
        })
    } else {
        let {statistics} = result[0]
        statistics.viewed = statistics.viewed + 1
        memeService.findByIdAndUpdate(result[0]['_id'], {statistics}).then(updateResult => {
            console.log(updateResult)
            if (updateResult) {
                res.status(200).json({
                    success: true,
                    message: `Total all-time viewed: ${updateResult.statistics.viewed} times.`
                })
            }
        }).catch(err => {
            console.log(err)
            res.status(400).json({
                success: false,
                message: err,
            })
        })
    }
});

app.listen(process.env.PORT, () => console.log(`Server started at ${process.env.PORT} PORT...`))
