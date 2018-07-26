const Speech = require('ssml-builder');
const State = require ('../../common/state.js');
const schema = require('./_schema.json')
exports.schema = schema

const courses = require('../../common/ctc/courses');

exports.Handler = {
    canHandle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        return request.type === 'IntentRequest'
            && request.intent.name === 'RetakeClassIntent';
    },
    async handle(handlerInput) {
        let speech = new Speech();
        let s = new State(handlerInput.requestEnvelope.request.intent.slots);
        const quarters = await courses.getQuartersOffered(s.subject, s.number);

        speech.say("This class is offered at Bellevue College")

        quarters.forEach((q) => speech.say(q).pause("1s"));
        
        return handlerInput.responseBuilder.speak(speech.ssml(true))
            .getResponse();
    },
}
