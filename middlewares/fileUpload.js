const util = require("util");
const multer = require("multer");
const maxSize = 2 * 1024 * 1024;

let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, app__basedir + "/public/uploads/");
    },
    filename: (req, file, cb) => {
        console.log(file.originalname);
        cb(null, Date.now() + "_" + file.originalname);
    },
});

const imageFilter = function(req, file, cb) {
    // Accept images only
    if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
        req.fileValidationError = 'Only image files are allowed!';
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
};

let uploadFile = multer({
    storage: storage,
    fileFilter: imageFilter,
    limits: { fileSize: maxSize },
}).single("memeImage");

let uploadFileMiddleware = util.promisify(uploadFile);
module.exports = uploadFileMiddleware;
