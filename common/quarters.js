const https = require('./get');
const regex = new RegExp('<a href=\"\/classes\/(?:Winter|Summer|Fall|Spring).*\">(.*)<\/a>', 'g');

exports.getQuarters = function (CourseAbbrev, CourseNumber, callback) {
    https.getBCRegex("/classes/All/" + CourseAbbrev + "/" + CourseNumber + "/", regex, (data) => callback(data));
};
