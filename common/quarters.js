const https = require('./get');
const regex = new RegExp('<a href=\"\/classes\/(?:Winter|Summer|Fall|Spring).*\">(.*)<\/a>', 'g');

exports.parseQuarter = (date, callback) => {
    quarter = date.split('-')

    if(quarter.length == 2) {
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
    } else {
        switch (quarter[1]) { // this can be a shorter if-else block
            case "01": case "02": case "03":
                quarter[1] = "Winter";
                break;
            case "04": case "05": case "06":
                quarter[1] = "Spring";
                break;
            case "07": case "08":
                quarter[1] = "Summer";
                break;
            case "09": case "10": case "11": case "12":
            default:
                quarter[1] = "Fall";
                break;
        };
    }

    callback(quarter.slice(0,2).reverse().join(""));
};

exports.getQuarters = (CourseAbbrev, CourseNumber, callback) => {
    https.getBCRegex("/classes/All/" + CourseAbbrev + "/" + CourseNumber + "/", regex, (data) => callback(data));
};