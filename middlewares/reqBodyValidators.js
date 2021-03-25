const {body, check} = require('express-validator');

exports.validate = (method) => {
    switch (method) {
        case 'register': {
            return [
                body('name', "Invalid name.").isLength({min: 1}),
                body('email', "Invalid email.").isEmail(),
                body('password', "Invalid password, must be at least 6 characters.").isLength({min: 6})
            ];
        }
            break;

        case 'login': {
            return [
                body('email', "Invalid email.").isEmail(),
                body('password', "Invalid password, must be at least 6 characters.").isLength({min: 6})
            ];
        }
            break;

        case 'addMeme': {
            return [
                check('memeName', "Invalid meme name.").isLength({min: 1})
            ];
        }
            break;
    }
}
