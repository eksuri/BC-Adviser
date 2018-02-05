const https = require('https');
const regex0 = /Winter.*\n<ul>\n<li>(.*)<\/li>\n<li>(.*)<\/li>\n<li>(.*)<\/li>/g;
const regex1 = /Spring.*\n<ul>\n<li>(.*)<\/li>\n<li>(.*)<\/li>\n<li>(.*)<\/li>/g;
const regex2 = /Summer.*\n<ul>\n<li>(.*)<\/li>\n<li>(.*)<\/li>/g;
const regex3 = /Fall.*\n<ul>\n<li>(.*)<\/li>\n<li>(.*)<\/li>\n<li>(.*)<\/li>/g;
// /Winter.*\n<ul>(\n<li>.*<\/li>)*/g

const date = new Date();
let month = date.getMonth();
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

https.get('https://www.bellevuecollege.edu/courses/exams/', (res) => {
    //console.log('statusCode:', res.statusCode);
    //console.log('headers:', res.headers);

    let data = '';

    res.on('data', (d) => {
        data += d.toString();
    }).on('end', (e) => {
        //console.log(data);
        while ((match = regex.exec(data))) {
            match.shift(); // shift match[0], only groups left
            match.forEach((s) => {
                dates.push(s);
            })
        }
        console.log(dates); // emit here
    });
}).on('error', (e) => {
    //console.error(e);
});
