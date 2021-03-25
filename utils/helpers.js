const urlGenerator = require('urlgenerator');

const genShareAbleLink = (host, fileName) => {
    const createURLWithParameters = urlGenerator.createURLwithParameters;
    const baseURL = 'http://' + host + '/';
    const parameters = {
        'fileName': fileName
    };
    const finalURL = createURLWithParameters(baseURL, parameters);
    return finalURL;
}

module.exports = {
    genShareAbleLink
}
