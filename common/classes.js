const https = require('./get');

const regex = new RegExp ('<span class="courseID">.*<\/span> <span class=\"courseTitle\">(.*)<\/span>','g'); 

// regex is bad, matches everything

exports.getOfferings = (course, quarter, callback) => {
    https.getBCRegex("/classes/" + quarter + "/" + course.toUpperCase() + '/', regex, (data) => callback(data));
};
