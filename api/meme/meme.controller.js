const jwt = require('jsonwebtoken');
const {validationResult} = require('express-validator');
const fs = require('fs')
const memeService = require('./meme.service')
const helpers = require('../../utils/helpers')

const insertMeme = async (req, res) => {
    try {
        jwt.verify(req.token, process.env.SECRET_KEY, (err, authData) => {
            if (err) {
                console.log(err)
                res.status(403).json({
                    message: "Invalid token provided!"
                });
            } else {
                console.log('16', req.body)
                console.log('17', req.file)
                const errors = validationResult(req)
                if (!errors.isEmpty()) {
                    if (req.file !== undefined) {
                        // console.log("Going for file deletion..")
                        fs.unlink(app__basedir + "/public/uploads/" + req.file.filename, (err) => {
                            if (err) {
                                console.log(err)
                                res.json({
                                    success: false,
                                    message: "Something went wrong!",
                                })
                            }
                            // console.log("File removed.")
                        })
                    }
                    res.status(400).json({
                        success: false,
                        message: "Validation failure!",
                        errors: errors.array()
                    })
                } else {
                    if (req.file == undefined) {
                        res.status(400).json({
                            success: false,
                            message: "Please uploads a file!"
                        })
                    } else {
                        const {memeName, allowedSite} = req.body
                        console.log('46', memeName)
                        console.log('46', allowedSite)
                        let allowedSiteList = []
                        if (allowedSite !== undefined) {
                            allowedSite.forEach(function (site) {
                                allowedSiteList.push(site)
                            });
                        }
                        const memeInfo = {
                            memeName,
                            memeImageName: req.file.filename,
                            allowedList: allowedSiteList,
                            creator: authData.user['_id'],
                            shareAbleLink: helpers.genShareAbleLink(req.headers.host, req.file.filename)
                        }
                        memeService.insert(memeInfo).then(result => {
                            if (result) {
                                res.status(201).json({
                                    success: true,
                                    message: "Added successfully.",
                                    // data: result
                                    shareableLink: result['shareAbleLink']
                                })
                            }
                        }).catch(err => {
                            res.status(400).json({
                                success: false,
                                message: err,
                            })
                        })
                    }
                }
            }
        });
    } catch (e) {
        console.log(e)
        res.json({
            success: false,
            message: "Something went wrong!",
        })
    }
}

const getMemesList = async (req, res) => {
    const memes = await memeService.findAll({})
    res.status(200).json({
        success: true,
        data: memes
    })
}

const getMemesStats = (req, res) => {
    jwt.verify(req.token, process.env.SECRET_KEY, async (err, authData) => {
        if (err) {
            console.log(err)
            res.status(403).json({
                message: "Invalid token provided!"
            });
        } else {
            console.log('103', authData.user['_id'])
            const memes = await memeService.findAll({creator: authData.user['_id']})
            res.status(200).json({
                success: true,
                data: memes
            })
        }
    });
}

module.exports = {
    insertMeme,
    getMemesList,
    getMemesStats
}
