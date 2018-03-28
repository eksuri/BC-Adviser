const https = require('./get');

const regex = new RegExp ('<span class="courseID">.*<\/span> <span class=\"courseTitle\">(.*)<\/span>','g'); 

exports.getOfferings = (subject, quarter, callback) => {
    https.getBCRegex("/classes/" + quarter + "/" + subject + "/", regex, (data) => callback(data));
};
