const Speech = require('ssml-builder');
const State = require ('../../common/state.js');
const schema = require('./_schema.json')
exports.schema = schema

const sections = require('../../common/ctc/sections.js');

exports.Handler =[ {
    canHandle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        return request.type === 'IntentRequest'
            && ["GetInstructorsIntent"].includes(request.intent.name)
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
            && ["GetInstructorsIntent"].includes(request.intent.name)
            && ["COMPLETED"].includes(request.dialogState);
    },
    async handle(handlerInput) {
        let speech = new Speech();
        let s = new State(handlerInput.requestEnvelope.request.intent.slots);
        const instructors = await sections.getInstructors(s.fullQuarter, s.subject, s.number);

        if(!Array.isArray(instructors)){
            speech.say("I'm sorry, that isn't working right now");
        } else if (instructors.length === 0) {
            speech.say("There are no instructors for ")
                  .say(s.subject)
                  .say(s.number)
                  .say("in")
                  .say(s.quarter)
                  .say(s.year)
        } else {
            speech.say("The instructors for")
                .say(s.subject)
                .say(s.number)
                .say("in")
                .say(s.quarter)
                .say(s.year)
                .say("are")
            instructors.forEach((i) => {
                speech.say(i)
                    .pause("1s");
            })
        }

        return handlerInput.responseBuilder.speak(speech.ssml(true))
            .getResponse();
    },
}]