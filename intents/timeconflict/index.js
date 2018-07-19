const Speech = require('ssml-builder');
const schema = require('./_schema.json')
exports.schema = schema

const sections = require('../../common/ctc/sections');

exports.Handler = {
    canHandle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        return request.type === 'IntentRequest'
            && request.intent.name === 'TimeConflictIntent';
    },
    async handle(handlerInput) {
        let speech = new Speech();

        const responseBuilder = handlerInput.responseBuilder;
        const slots = handlerInput.requestEnvelope.request.intent.slots;

        //Extract the value of the slots
        const CourseAbbrevOne = slots.CourseAbbrevOne.value;
        const CourseNumberOne = slots.CourseNumberOne.value;
        const CourseAbbrevTwo = slots.CourseAbbrevTwo.value;
        const CourseNumberTwo = slots.CourseNumberTwo.value;
        const quarter = (slots.Quarter.value == "autumn" ? "fall" : slots.Quarter.value);
        const year = slots.Year.value;

        // format: {Sections: [Times: [MW, 10:30, 12:30], [F, 11:30, 1:30]]}
        const scheduleOne = await sections.getCourseSchedule(quarter + year, CourseAbbrevOne, CourseNumberOne);
        const scheduleTwo = await sections.getCourseSchedule(quarter + year, CourseAbbrevTwo, CourseNumberTwo);

        // update times object before fully implementing

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
          }else{
              speech.say("Of course, you can take both")
              .say(CourseAbbrevOne)
              .say(CourseNumberOne)
              .say("and")
              .say(CourseAbbrevTwo)
              .say(CourseNumberTwo)
              .say(quarter)
              .say(year)
          }
          return responseBuilder.speak(speech.ssml(true))
              .getResponse();
    }
}
