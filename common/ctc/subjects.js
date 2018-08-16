const fetch = require('node-fetch');

exports.getAllSubjects = async () => {
    const res = await fetch("http://bellevuecollege.edu/classes/All/?format=json");
    const data = await res.json();
    return data;
}