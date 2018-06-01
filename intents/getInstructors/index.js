const Speech = require('ssml-builder');
const schema = require('./_schema.json')
exports.schema = schema

const sections = require('../../common/ctc/sections.js');

exports.getInstructors = async function () {
    let speech = new Speech();

    const quarter = (this.event.request.intent.slots.Quarter.value == "autumn" ?
            "fall" : this.event.request.intent.slots.Quarter.value);
    const year = this.event.request.intent.slots.Year.value;
    const subject = this.event.request.intent.slots.Subjects.value;
    const number = this.event.request.intent.slots.Number.value;

    const instructors = await sections.getInstructors(quarter + year, number, subject);

    speech.say("The instructors for")
          .say(subject)
          .say(number)
          .say("in")
          .say(quarter)
          .say(year)
          .say("are")
    instructors.forEach((i) => {
        speech.say(i);
    })

    this.emit(':tell', speech.ssml(true));
}



