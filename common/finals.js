const https = require('./get');

const regex0 = /Winter.*\n<ul>\n<li>(.*)<\/li>\n<li>(.*)<\/li>\n<li>(.*)<\/li>/g;
const regex1 = /Spring.*\n<ul>\n<li>(.*)<\/li>\n<li>(.*)<\/li>\n<li>(.*)<\/li>/g;
const regex2 = /Summer.*\n<ul>\n<li>(.*)<\/li>\n<li>(.*)<\/li>/g;
const regex3 = /Fall.*\n<ul>\n<li>(.*)<\/li>\n<li>(.*)<\/li>\n<li>(.*)<\/li>/g;
// /Winter.*\n<ul>(\n<li>.*<\/li>)*/g

exports.getDates = (month, callback) => {
    let regex;

    switch (month) { // this can be a shorter if-else block
        case 1: case 2: case 3:
            regex = regex0;
            break;
        case 4: case 5: case 6:
            regex = regex1;
            break;
        case 7: case 8:
            regex = regex2;
            break;
        default:
            regex = regex3;
            break;
    };

    let dates = [];
    https.getBCRegex('/courses/exams/', regex, (data) => callback(data));
}