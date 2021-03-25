const userService = require('./user.service')
const {validationResult} = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const saltRounds = 10;

const register = async (req, res) => {
    try {
        const {name, email, password} = req.body
        let registerUserInfo = {name, email, password}

        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            res.status(400).json({
                success: false,
                message: "Validation failure!",
                errors: errors.errors
            })
        } else {
            const result = await userService.findByEmail(email)
            if (result.length > 0) {
                res.status(400).json({
                    success: false,
                    message: "This email belongs to an existing registered user! Choose something else.",
                })
            } else {
                const hashingPassword = bcrypt.hashSync(password, saltRounds)
                registerUserInfo.password = hashingPassword
                userService.create(registerUserInfo).then(result => {
                    if (result) {
                        res.status(201).json({
                            success: true,
                            message: "Signed up successfully.",
                            data: result
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
    } catch (e) {
        console.log(e)
        res.json({
            success: false,
            message: "Something went wrong!",
        })
    }
}


const login = async (req, res) => {
    try {
        const {email, password} = req.body
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            res.status(400).json({
                success: false,
                message: "Validation failure!",
                errors: errors.errors
            })
        } else {
            const result = await userService.findByEmail(email);
            if (result.length == 0 || !(await bcrypt.compare(password, result[0].password))) {
                res.status(401).json({
                    success: false,
                    message: "Email or password is incorrect.",
                })
            } else {
                jwt.sign({user: result[0]}, process.env.SECRET_KEY, {expiresIn: '1d'}, (err, token) => {
                    res.status(200).json({
                        success: true,
                        message: "Logged in successfully.",
                        token: token
                    })
                });
            }
        }
    } catch (e) {
        console.log(e)
    }
}

module.exports = {
    register,
    login,
}
