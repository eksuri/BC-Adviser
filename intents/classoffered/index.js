const Speech = require('ssml-builder');
const schema = require('./_schema.json')
exports.schema = schema

const sections = require('../../common/ctc/sections.js');

exports.ClassesOfferedIntent = async function () {
    let speech = new Speech();

    const quarter = (this.event.request.intent.slots.Quarter.value == "autumn" ?
            "fall" : this.event.request.intent.slots.Quarter.value);
    const year = this.event.request.intent.slots.Year.value;
    const subject = this.event.request.intent.slots.Subjects.value;


    coursesOffered = await sections.getCoursesOffered(quarter + year, subject);

    speech.say("The following")
          .say(subject)
          .say("classes are offered")
          .say(quarter)
          .say(year)
          .pause("1s")

    coursesOffered.forEach((c) => {
        speech.say(c)}
    );

    this.emit(':tell', speech.ssml(true));
}

