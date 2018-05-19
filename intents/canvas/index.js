const Speech = require('ssml-builder');
const schema = require('./_schema.json')
exports.schema = schema

const canvas = require('../../common/canvas/canvas.js');

exports.GetMyClasses = async function () {
    let speech = new Speech();
    courses = await canvas.getClasses();

    if (courses != null && courses[0] != null) {
        speech.say("This quarter you're currently enrolled in");
        courses.forEach((course) => speech.say(course));
    } else {
        speech.say("I'm not sure.");
    }


    this.emit(':tell', speech.ssml(true));
}


exports.GetMyGrades = async function () {
    let speech = new Speech();
    grades = await canvas.getGrades();

    if (grades != null && grades[0] != null) {
        speech.say("Your grade in")
              .say(grades[0][0])
              .say("is")
              .say(grades[0][1])
    } else {
        speech.say("I'm not sure.");
    }


    this.emit(':tell', speech.ssml(true));
}