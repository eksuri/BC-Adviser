const https = require('./get');

const regex = new RegExp ('<span class="courseID">.*<\/span> <span class=\"courseTitle\">(.*)<\/span>','g'); 

// regex is bad, matches everything

exports.getOfferings = (course, quarter, callback) => {
    let offerings = [];
    let url = "https://www.bellevuecollege.edu/classes/" + quarter + "/" + course.toUpperCase();
    https.get('https://www.bellevuecollege.edu/courses/exams/', (data) => {
        /*while ((match = regex.exec(data))) {
            //console.log(match)
            match.forEach((s) => {
                offerings.push(s);
            })
            callback(offerings)
        }*/ 

        offerings.push("fix me");
        callback(offerings);
    })
};
