const urlGenerator = require('urlgenerator');

const genShareAbleLink = (host, fileName) => {
    const createURLWithParameters = urlGenerator.createURLwithParameters;
    const baseURL = 'http://' + host + '/';
    const parameters = {
        'fileName': fileName
    };
    const finalURL = createURLWithParameters(baseURL + 'view-meme', parameters);
    return finalURL;
}

module.exports = {
    genShareAbleLink
}
