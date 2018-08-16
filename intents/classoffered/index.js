const Speech = require('ssml-builder');
const State = require ('../../common/state.js');
const schema = require('./_schema.json')
exports.schema = schema

const sections = require('../../common/ctc/sections.js');

exports.Handler =[ {
    canHandle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        return request.type === 'IntentRequest'
            && ["ClassesOfferedIntent"].includes(request.intent.name)
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
            && ["ClassesOfferedIntent"].includes(request.intent.name)
            && ["COMPLETED"].includes(request.dialogState);;
    },
    async handle(handlerInput) {
        let speech = new Speech();
        let s = new State(handlerInput.requestEnvelope.request.intent.slots);
        coursesOffered = await sections.getCoursesOffered(s.fullQuarter, s.subject);

        if(!Array.isArray(coursesOffered)) {
            speech.say("I'm sorry, I couldn't find that.")
        } else if (coursesOffered.length == 0){
            speech.say("There are no")
                  .say(s.subject)
                  .say("classes offered")
                  .say(s.quarter)
                  .say(s.year);
        } else {
            speech.say("The following")
            .say(s.subject)
            .say("classes are offered")
            .say(s.quarter)
            .say(s.year)
            .pause("1s")

            coursesOffered.forEach((c) => {
                let c_array = c.split(" ");
                let last = c_array.pop();
                let converted = last.replace("VIII", "8").replace("VII", "7").replace("VI", "6").replace("IV", " 4").replace("V", "5").replace("III", " 3").replace("II", " 2").replace("I", " 1")

                c_array.forEach((ca) => speech.say(ca));
                speech.say(converted)
                      .pause("1s");

            });
        }

        return handlerInput.responseBuilder.speak(speech.ssml(true))
            .getResponse();
    }
}]