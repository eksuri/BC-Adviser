const Speech = require('ssml-builder');
const State = require ('../../common/state.js');
const schema = require('./_schema.json')
exports.schema = schema

const sections = require('../../common/ctc/sections.js');

exports.Handler = [{
    canHandle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        return request.type === 'IntentRequest'
            && request.intent.name === 'GetInstructorsIntent';
    },
    async handle(handlerInput) {
        let speech = new Speech();
        let s = new State(handlerInput.requestEnvelope.request.intent.slots);
        const instructors = await sections.getInstructors(s.fullQuarter, s.subject, s.number);

        speech.say("The instructors for")
            .say(s.subject)
            .say(s.number)
            .say("in")
            .say(s.quarter)
            .say(s.year)
            .say("are")
        instructors.forEach((i) => {
            speech.say(i);
        })

        return handlerInput.responseBuilder.speak(speech.ssml(true))
            .getResponse();
    },
}]