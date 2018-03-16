const https = require('./get');

const regex = new RegExp ('<span class="courseID">.*<\/span> <span class=\"courseTitle\">(.*)<\/span>','g'); 

// regex is bad, matches everything

exports.getOfferings = (course, quarter, callback) => {
    let offerings = [];
    let url = "https://www.bellevuecollege.edu/classes/" + quarter + "/" + course.toUpperCase();
    https.get(url, (data) => {
        while ((match = regex.exec(data))) {
            match.forEach((s) => {
                offerings.push(s);
            })
        }

        console.log()

        //offerings.push("fix me");
        callback(offerings);
    })
};
