const fetch = require('node-fetch');

exports.getAllSubjects = async () => {
    const res = await fetch("http://bellevuecollege.edu/classes/All/?format=json");
    const data = await res.json();
    return data.Courses;
}

exports.getSubjects = async (quarter) => {
    const res = await fetch("http://bellevuecollege.edu/classes/" + quarter.toUpperCase() + "/?format=json");
    const data = await res.json();
    return data.Courses;
}