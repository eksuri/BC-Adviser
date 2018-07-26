const Speech = require('ssml-builder');
const State = require ('../../common/state.js');
const schema = require('./_schema.json')
exports.schema = schema

const sections = require('../../common/ctc/sections.js');

exports.Handler =[ {
    canHandle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        return request.type === 'IntentRequest'
            && ["ClassOffered"].includes(request.intent.name)
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
            && request.intent.name === 'ClassesOfferedIntent'
            && ["COMPLETED"].includes(request.dialogState);;
    },
    async handle(handlerInput) {
        let speech = new Speech();
        let s = new State(handlerInput.requestEnvelope.request.intent.slots);
        coursesOffered = await sections.getCoursesOffered(s.fullQuarter, s.subject);

        speech.say("The following")
            .say(s.subject)
            .say("classes are offered")
            .say(s.quarter)
            .say(s.year)
            .pause("1s")

        coursesOffered.forEach((c) => {
            speech.say(c)
        }
        );

        return handlerInput.responseBuilder.speak(speech.ssml(true))
            .getResponse();
    }
}]