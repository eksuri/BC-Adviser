const Speech = require('ssml-builder');
const schema = require('./_schema.json')
exports.schema = schema

const sections = require('../../common/ctc/sections');

exports.Handler = {
    canHandle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        return request.type === 'IntentRequest'
            && request.intent.name === 'ClassScheduleIntent';
    },
    async handle(handlerInput) {
        let speech = new Speech();

        const responseBuilder = handlerInput.responseBuilder;
        const slots = handlerInput.requestEnvelope.request.intent.slots;

        //Extract the value of the slots
        const CourseAbbrev = slots.CourseAbbrev.value;
        const CourseNumber = slots.CourseNumber.value;
        const quarter = (slots.Quarter.value == "autumn" ?
            "fall" : slots.Quarter.value);
        const year = slots.Year.value;


        // format: {Sections: [Times: [MW, 10:30, 12:30], [F, 11:30, 1:30]]}
        // potential format: {mask: [0,1,0,1,1,0], times:[[10:30,12:30],[10:30,12:30],[11:30,1:30]]}
        const schedule = await sections.getCourseSchedule(quarter + year, CourseAbbrev, CourseNumber);



        let scheduleString = "";
        schedule.Sections[0].Times.forEach((s) => {
            // each of these have three elements
            if (s[0] == "Online") {
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

        return responseBuilder.speak(speech.ssml(true))
            .getResponse();
    }
}