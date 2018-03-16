const https = require('./get');
const regex = new RegExp('<a href=\"\/classes\/[W|S|F].*\">(.*)<\/a>', 'g');

exports.getQuarters = function (course, callback) {
    let c = course.split(" ");
    let url = "https://www.bellevuecollege.edu/classes/All/" + c[0].toUpperCase() + "/" + c[1];
    //console.log(url);
    let quarts = [];
    https.get(url, (data) => {
        //console.log(data);
        while ((match = regex.exec(data))) {
            match.forEach((s) => {
                quarts.push(s);
            })
        }
        callback(quarts);
    })
};
