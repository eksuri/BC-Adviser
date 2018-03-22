const https = require('./get');
const regex = new RegExp('<a href=\"\/classes\/(?:Winter|Summer|Fall|Spring).*\">(.*)<\/a>', 'g');

exports.parseQuarter = (date, callback) => {
    quarter = date.split('-')

    switch (quarter[1]) { // this can be a shorter if-else block
        case "WI":
            quarter[1] = "Winter";
            break;
        case "SP":
            quarter[1] = "Spring";
            break;
        case "SU":
            quarter[1] = "Summer";
            break;
        case "FA":
        default:
            quarter[1] = "Fall";
            break;
    };

    callback(quarter.reverse().join(""));
};

exports.getQuarters = (CourseAbbrev, CourseNumber, callback) => {
    https.getBCRegex("/classes/All/" + CourseAbbrev + "/" + CourseNumber + "/", regex, (data) => callback(data));
};