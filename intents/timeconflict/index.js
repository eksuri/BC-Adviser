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
    
    // boolean
    let conflict = await sections.CompareCourseSchedule (CourseAbbrevOne, CourseNumberOne, CourseAbbrevTwo, CourseNumberTwo, quarter, year);
    if(conflict===true){
    speech.say("You cannot take both")
          .say(CourseAbbrevOne)
          .say(CourseNumberOne)
          .say("and")
          .say(CourseAbbrevTwo)
          .say(CourseNumberTwo)
          .say(quarter)
          .say(year)

    this.emit(':tell', speech.ssml(true));
    }
    else{
        speech.say("Of course, you can take both")
        .say(CourseAbbrevOne)
        .say(CourseNumberOne)
        .say("and")
        .say(CourseAbbrevTwo)
        .say(CourseNumberTwo)
        .say(quarter)
        .say(year)

  this.emit(':tell', speech.ssml(true));

    }
    //console.log("The boolean variable is: " + conflict); //just for debuging 
    //console.log(speech); //just for debuging
}