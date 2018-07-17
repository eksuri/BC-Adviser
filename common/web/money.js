const fetch = require('node-fetch');
const regex = new RegExp('<td><a.*?>(<strong>)?(.*?)(<\/strong>)?<\/a><\/td>', 'g');


exports.getScholarships = async () => {
    const res = await fetch("https://www.bellevuecollege.edu/scholarships/scholarships.html");
    const data = await res.text();

    let array = [];

    while ((match = regex.exec(data))) {
        array.push(match[2]);
    }
    return array;
};

