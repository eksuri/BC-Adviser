const Speech = require('ssml-builder');
const schema = require('./_schema.json')
exports.schema = schema

const sections = require('../../common/ctc/sections');

exports.ClassScheduleIntent = async function  () {
    let speech = new Speech();
    
    //Extract the value of the slots
    const CourseAbbrev = this.event.request.intent.slots.CourseAbbrev.value;
    const CourseNumber = this.event.request.intent.slots.CourseNumber.value;
    const quarter = (this.event.request.intent.slots.Quarter.value == "autumn" ?
        "fall" : this.event.request.intent.slots.Quarter.value);
    const year = this.event.request.intent.slots.Year.value;

    
    // format: {Sections: [Times: [MW, 10:30, 12:30], [F, 11:30, 1:30]]}
    const schedule = await sections.getCourseSchedule(quarter + year, CourseAbbrev, CourseNumber);
    
    speech.say(CourseAbbrev)
          .say(CourseNumber)
          .say("is offered in")
          .say(schedule.Sections.length)
          .say("different sections")
          .pause("2s");

    // figure out how to start telling some of the times
    // convert times array into object

    this.emit(':tell', speech.ssml(true));
}