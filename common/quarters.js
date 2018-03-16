const https = require('./get');
const regex = new RegExp('<a href=\"\/classes\/(?:Winter|Summer|Fall|Spring).*\">(.*)<\/a>', 'g');

exports.getQuarters = function (course, callback) {
    let c = course.split(" ");
    let url = "https://www.bellevuecollege.edu/classes/All/" + c[0].toUpperCase() + "/" + c[1];
    let quarts = [];
    console.log(url)
    https.get(url, (data) => {
        console.log(data);
        while ((match = regex.exec(data))) {
            match.forEach((s) => {
                quarts.push(s);
            })
        }
        callback(quarts);
    })
};
