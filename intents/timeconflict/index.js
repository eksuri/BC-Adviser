const Speech = require('ssml-builder');
const schema = require('./_schema.json')
exports.schema = schema

const sections = require('../../common/ctc/sections');

exports.TimeConflictIntent = async function () {
    let speech = new Speech();

    //Extract the value of the slots
    const CourseAbbrevOne = this.event.request.intent.slots.CourseAbbrevOne.value;
    const CourseNumberOne = this.event.request.intent.slots.CourseNumberOne.value;
    const CourseAbbrevTwo = this.event.request.intent.slots.CourseAbbrevTwo.value;
    const CourseNumberTwo = this.event.request.intent.slots.CourseNumberTwo.value;
    const quarter = (this.event.request.intent.slots.Quarter.value == "autumn" ?
        "fall" : this.event.request.intent.slots.Quarter.value);
    const year = this.event.request.intent.slots.Year.value;
    
    // format: {Sections: [Times: [MW, 10:30, 12:30], [F, 11:30, 1:30]]}
    const scheduleOne = await sections.getCourseSchedule(quarter + year, CourseAbbrevOne, CourseNumberOne);
    const scheduleTwo = await sections.getCourseSchedule(quarter + year, CourseAbbrevTwo, CourseNumberTwo);
    
    // update times object before fully implementing

    // boolean
    let no_conflict = scheduleOne.Sections.some((s1) => {
        // boolean
        return c = scheduleTwo.Sections.some((s2)=> {
            return (true);
        })
    })
    
    speech.say("You")
          .say(no_conflict ? "can" : "cannot")
          .say("take both")
          .say(CourseAbbrevOne)
          .say(CourseNumberOne)
          .say("and")
          .say(CourseAbbrevTwo)
          .say(CourseNumberTwo)
          .say(quarter)
          .say(year)

    this.emit(':tell', speech.ssml(true));
}