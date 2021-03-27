const express = require('express')
const session = require('express-session')
const path = require('path')
const fetch = require('node-fetch');
const db = require('./config/db')
if (process.env.NODE_ENV !== "production") {
    require('dotenv').config()
}
const userRouter = require('./api/user/user.router')
const memeRouter = require('./api/meme/meme.router')
const bodyParser = require('body-parser')
const memeService = require('./api/meme/meme.service')

const app = express()

const __basedir = __dirname;
global.app__basedir = __basedir;

db.connect()

app.set('view engine', 'ejs')

app.use(express.json())
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, '/public')))
app.use(session({
    secret: 'Memes_Secret_Key',
    resave: true,
    saveUninitialized: true
}))

app.use('/api/auth', userRouter)
app.use('/api/meme', memeRouter)


app.get('/', async function (req, res) {
    const baseURL = 'http://' + req.headers.host;
    const result = await fetch(baseURL + '/api/meme/all', {
        method: 'GET',
        headers: {}
    }).then((res) => res.json())
    // console.log(result)
    const memes = result.data
    console.log(memes)
    res.render('pages/memes/list', {
        title: 'Memes',
        memes,
        hasSession: req.session.memesAuthToken === undefined ? false : true
    });
});

app.get('/register', function (req, res) {
    res.render('pages/registration', {
        title: 'Register',
        hasSession: req.session.memesAuthToken === undefined ? false : true
    });
});

app.get('/login', function (req, res) {
    res.render('pages/login', {title: 'Login', hasSession: req.session.memesAuthToken === undefined ? false : true});
});

app.get('/logout', async function (req, res) {
    req.session.destroy(function (error) {
        if (!error) {
            console.log("Session Destroyed")
            res.redirect('/login')
        }
    })
});

app.get('/memes/add', async function (req, res) {
    if (req.session.memesAuthToken === undefined) {
        res.redirect('/login')
    } else {
        res.render('pages/memes/add', {
            title: 'Upload a Meme',
            token: req.session.memesAuthToken,
            hasSession: req.session.memesAuthToken === undefined ? false : true
        });
    }
});

app.get('/memes/stats', async function (req, res) {
    if (req.session.memesAuthToken === undefined) {
        res.redirect('/login')
    } else {
        const baseURL = 'http://' + req.headers.host;
        const result = await fetch(baseURL + '/api/meme/stats', {
            method: 'GET',
            headers: {'Authorization': `Bearer ${req.session.memesAuthToken}`}
        }).then((res) => res.json())
        console.log('74', result)
        const memes = result.data
        console.log(memes)
        res.render('pages/memes/stats', {
            title: 'Uploaded memes statistics',
            memes: memes,
            hasSession: req.session.memesAuthToken === undefined ? false : true
        });
    }
});

app.get('/view-meme', async function (req, res) {
    const shareAbleLinkURL = req.protocol + '://' + req.get('host') + req.originalUrl
    const result = await memeService.findByConditions({shareAbleLink: shareAbleLinkURL})
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
                res.render('pages/memes/view', {
                    title: 'View meme',
                    meme: updateResult,
                    hasSession: req.session.memesAuthToken === undefined ? false : true
                });
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

app.post('/meme/like', async function (req, res) {
        const result = await memeService.findByConditions({_id: req.body.memeId})
        if (result.length == 0) {
            res.status(404).json({
                success: false,
                message: "The meme couldn't be found into our record!",
            })
        } else {
            let {statistics} = result[0]
            statistics.liked = statistics.liked + 1
            memeService.findByIdAndUpdate(req.body.memeId, {statistics}).then(updateResult => {
                console.log(updateResult)
                if (updateResult) {
                    res.status(200).json({
                        success: true,
                        message: "Like proceeded successfully.",
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
    }
);

app.listen(process.env.PORT, () => console.log(`Server started at ${process.env.PORT} PORT...`))
