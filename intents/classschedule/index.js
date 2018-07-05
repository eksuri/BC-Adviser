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
    // potential format: {mask: [0,1,0,1,1,0], times:[[10:30,12:30],[10:30,12:30],[11:30,1:30]]}
    const schedule = await sections.getCourseSchedule(quarter + year, CourseAbbrev, CourseNumber);

    

    let scheduleString = "";
    schedule.Sections[0].Times.forEach((s)=> {
        // each of these have three elements
        if(s[0] == "Online") {
            scheduleString += "Online"
        } else {
            let days = s[0]
                .replace("Th", "Thursday")
                .replace("T", "Tuesday ")
                .replace("M", "Monday ")
                .replace("W", "Wednedsay ")
                .replace("F", "Friday ");
            scheduleString += days;
            scheduleString += s[1];
            scheduleString += " to "
            scheduleString += s[2];
            scheduleString += " ";   
        }
    });

    speech.say(CourseAbbrev)
          .say(CourseNumber)
          .say("is offered")
          .say(scheduleString)
          .pause("2s");




    // figure out how to start telling some of the times
    // convert times array into object

    this.emit(':tell', speech.ssml(true));
}



/*
exports.ClassScheduleIntent = function  () {
    //Extract the value of the slots
    const CourseAbbrev = this.event.request.intent.slots.CourseAbbrev.value;
    const CourseNumber = this.event.request.intent.slots.CourseNumber.value;
    const quarter = (this.event.request.intent.slots.Quarter.value == "autumn" ?
        "fall" : this.event.request.intent.slots.Quarter.value);
    const year = this.event.request.intent.slots.Year.value;

    classes.getClassSchedule(CourseAbbrev, CourseNumber, quarter, year, (classSchedule) => {
        let speechOutput = " ";
        //check if the user entered all the required variable
        if(CourseAbbrev != null && CourseNumber != null && quarter != null && year != null){ 
            speechOutput = CourseAbbrev + CourseNumber + " will be available in the " + quarter + year + " at Bellevue College : "
            if (classSchedule != null && classSchedule[0] != null){ // Check if we found a schedule for this class
                for (let i = 0; i = classSchedule.length; i++) {  
                    speechOutput += classSchedule.shift() + " ";
                }
            }
            else { // If not found informs and guides the user to ask about class offered
                speechOutput = "There are no information yet about the schedule of this class, or you entered wrong variables. Please check what class are offred in " + quarter + " " + year + " for the desired subject; in order to find if this class is offered at Bellevue College"
            }
        }
        else {
            speechOutput = "You did not enter all the required variables. You should enter a course abreviation, a course number, a quarter, and a year."
        }
        this.response.speak(speechOutput);
        this.emit(':responseReady');
    
        //console.log(speechOutput); //just for debuging 
    });
};

*/