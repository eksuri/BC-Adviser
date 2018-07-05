const Speech = require('ssml-builder');
const schema = require('./_schema.json')
exports.schema = schema

const courses = require('../../common/ctc/courses');

exports.RetakeClassIntent = async function () {
    let speech = new Speech();

    const CourseAbbrev = this.event.request.intent.slots.CourseAbbrev.value;
    const CourseNumber = this.event.request.intent.slots.CourseNumber.value;

    const quarters = await courses.getQuartersOffered(CourseAbbrev, CourseNumber);

    speech.say("This class is offered at Bellevue College")

    quarters.forEach((q) => speech.say(q).pause("1s"));
    this.emit(':tell', speech.ssml(true));
}