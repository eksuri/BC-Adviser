const Speech = require('ssml-builder');
const State = require ('../../common/state.js');
const schema = require('./_schema.json')
exports.schema = schema

const sections = require('../../common/ctc/sections');

exports.Handler =[ {
    canHandle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        return request.type === 'IntentRequest'
            && ["ClassScheduleIntent"].includes(request.intent.name)
            && ["STARTED", "IN_PROGRESS"].includes(request.dialogState);
    },
    async handle(handlerInput) {
        const currentIntent = handlerInput.requestEnvelope.request.intent;
        return handlerInput.responseBuilder
            .addDelegateDirective(currentIntent)
            .getResponse();
    },
},
{
    canHandle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        return request.type === 'IntentRequest'
            && ["ClassScheduleIntent"].includes(request.intent.name)
            && ["COMPLETED"].includes(request.dialogState);
    },
    async handle(handlerInput) {
        let speech = new Speech();
        let s = new State(handlerInput.requestEnvelope.request.intent.slots);

        // format: {Sections: [Times: [MW, 10:30, 12:30], [F, 11:30, 1:30]]}
        // potential format: {mask: [0,1,0,1,1,0], times:[[10:30,12:30],[10:30,12:30],[11:30,1:30]]}
        const schedule = await sections.getCourseSchedule(s.fullQuarter, s.subject, s.number);


        if(schedule.Sections.length === 0) {
            speech.say("I'm sorry, I couldn't find that.")
        } else if (schedule.Sections.length > 1) {
            speech.say("There are")
                  .say(schedule.Sections.length)
                  .say("different sections available for")
                  .say(s.subject)
                  .say(s.number)
                  .say("in")
                  .say(s.quarter)
                  .say(s.year)
                  .pause("1s")
                  .say("Please check online for the full schedule");
        } else {
            speech.say(s.subject)
                  .say(s.number)
                  .say("is offered")

            schedule.Sections[0].Times.forEach((s) => {
                // each of these have three elements
                if (s[0] == "Online") {
                    speech.say("Online");
                } else {
                    s.Days.forEach((day) => speech.say(day));
                    speech.say(s.Start.Hour)
                          .say(s.Start.Minute)
                          .say("to")
                          .say(s.End.Hour)
                          .say(s.End.Minute)
                          .pause("1s");
                }
            });
        }


        return handlerInput.responseBuilder.speak(speech.ssml(true))
            .getResponse();
    }
}]