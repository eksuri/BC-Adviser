const https = require('./get');
const config = require('../config.json')

const api = "https://canvas.instructure.com/api"
const token = config.token;

exports.getClasses = (callback) => {
    https.get("https://canvas.instructure.com/api/v1/courses?access_token=" + token + "&enrollment_state=active",
    (data) => {
        array = [];
        JSON.parse(data).forEach((course) => {
            array.push(course.name);
        })
        callback(array);
    });
}

exports.getGrades = (callback) => {
    https.get("https://canvas.instructure.com/api/v1/courses?access_token=" + token + "&include=total_scores",
    (data) => {
        array = [];
        JSON.parse(data).forEach((course) => {
            if(course.enrollments) {
                array.push([course.name.split('-')[1], course.enrollments[0].computed_final_score]);
            }
        })
        callback(array);
    });
}