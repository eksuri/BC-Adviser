const fetch = require('node-fetch');
const config = require('../../config.json')

const api = "https://canvas.instructure.com/api"
const token = config.token;

exports.getClasses = async () => {
    const res = await fetch("https://canvas.instructure.com/api/v1/courses?access_token=" + token + "&enrollment_state=active");
    const data = await res.json();

    array = [];
    data.forEach((course) => {
        if(course.end_at != null) {
            array.push(course.name.substring(11));
        }
    })
    return array;
}

exports.getGrades = async () => {
    const res = await fetch("https://canvas.instructure.com/api/v1/courses?access_token=" + token + "&include=total_scores");
    const data = await res.json();
    
    array = [];
    data.forEach((course) => {
        if(course.enrollments) {
            array.push([course.name.substring(11), course.enrollments[0].computed_final_score]);
        }
    })
    return array;
}