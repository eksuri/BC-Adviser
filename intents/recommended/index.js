const Speech = require('ssml-builder');
const schema = require('./_schema.json')
exports.schema = schema

const courses = require('../../common/ctc/courses.js');

exports.GetRecommendedIntent = async function () {
    let speech = new Speech();

    const CourseAbbrev = this.event.request.intent.slots.CourseAbbrev.value;
    const CourseNumber = this.event.request.intent.slots.CourseNumber.value;
    
    recommended = await courses.getRecommended(CourseAbbrev, CourseNumber);

    if (recommended) {
        speech.say("Before taking")
              .say(CourseAbbrev)
              .say(CourseNumber)
              .say("it is recommended that you should take")
              .say(recommended)
    } else {
        speech.say("There are no recommended classes for you to take before")
              .say(CourseAbbrev)
              .say(CourseNumber)
    }

    this.emit(':tell', speech.ssml(true));
}

exports.GetPrerequisiteIntent = async function () {
    let speech = new Speech();

    const CourseAbbrev = this.event.request.intent.slots.CourseAbbrev.value;
    const CourseNumber = this.event.request.intent.slots.CourseNumber.value;
    
    prerequisite = await courses.getPrerequisite(CourseAbbrev, CourseNumber);

    if (prerequisite) {
        speech.say("Prerequisites for")
              .say(CourseAbbrev)
              .say(CourseNumber)
              .say("include")
              .say(prerequisite)
    } else {
        speech.say("There are no prerequisites for you to take before")
              .say(CourseAbbrev)
              .say(CourseNumber)
    }

    this.emit(':tell', speech.ssml(true));
}