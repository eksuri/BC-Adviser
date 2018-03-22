const https = require('./get');

exports.getRecommended = (subject, classNumber, callback) => {
    const regex = /Recommended: (.*?)<\/p>/g
    let url = "/classes/All/" + subject.toUpperCase() + '/' + classNumber + '/';
    https.getBCRegex(url, regex, callback)
}

exports.getPrerequisite = (subject, classNumber, callback) => {
    const regex = /Prerequisite: (.*?)<\/p>/g
    let url = "/classes/All/" + subject.toUpperCase() + '/' + classNumber + '/';
    https.getBCRegex(url, regex, callback)
}