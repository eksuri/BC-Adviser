//const https = require('./get');
const fetch = require('node-fetch');

exports.getRating = async (firstName, lastName) => {
    const regexFirst = new RegExp('ShowRatings\\.jsp\\?tid=(.*)"[\\s\\S]*' + lastName + ', ' + firstName, 'g');
    const dataFirst = await fetch("http://www.ratemyprofessors.com/search.jsp?queryoption=HEADER&queryBy=teacherName&schoolName=Bellevue+College&schoolID=1553&query=" + firstName + '+' + lastName);
    const resFirst = await dataFirst.text();

    matchFirst = regexFirst.exec(resFirst);
    
    const resSecond = await fetch("http://www.ratemyprofessors.com/ShowRatings.jsp?tid=" + matchFirst[1]);
    const dataSecond = await resSecond.text();

    //const regexSecond = /Overall Quality[\s\S]*title="">(.*)<[\s\S]*Would Take Again[\s\S]*?<div class="grade" title="">\s(.*)[\s\S]*?Level of Difficulty[\s\S]*?title="">\s(.*)[\s\S]*<img src="\/assets\/chilis\/(.*)/g
    //former regex was way to expensive

    const regexSecond = /<div class="grade" title="">([\s\S]*?)<\/div>/g

    let results = [];

    while ((matchSecond = regexSecond.exec(dataSecond))) {
        matchSecond.shift();
        matchSecond.forEach((s) => {
            results.push(s.trim());
        })
    }

    return(results);

}

// hopefully no one's regex is relying on Html entitys or this will have to be pushed farther down the line
async function decodeHtmlEntity(str) {
    return str.replace(/&#(\d+);/g, function (match, dec) {
        return String.fromCharCode(dec);
    });
};