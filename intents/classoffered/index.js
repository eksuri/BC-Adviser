const Speech = require('ssml-builder');
const schema = require('./_schema.json')
exports.schema = schema

const courses = require('../../common/ctc/courses.js');

exports.ClassesOfferedIntent = async function () {
    let speech = new Speech();

    const subject = this.event.request.intent.slots.Subjects.value;
    const quarter = (this.event.request.intent.slots.Quarter.value == "autumn" ?
        "fall" : this.event.request.intent.slots.Quarter.value);
    const year = this.event.request.intent.slots.Year.value;


    coursesOffered = courses.getCoursesOffered(subject, quarter + year)

    speech.say("The following")
          .say(subject)
          .say("classes are offered")
          .say(quarter)
          .say(year)
          .pause("1s")
          .say()

    coursesOffered.forEach((c) => {
        speech.say(c)
    })

    this.emit(':tell', speech.ssml(true));

}

