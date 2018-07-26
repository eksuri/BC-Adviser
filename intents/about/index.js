const Speech = require('ssml-builder');
const State = require ('../../common/state.js');
const schema = require('./_schema.json')
exports.schema = schema

exports.Handler = {
    canHandle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        return request.type === 'IntentRequest' && request.intent.name === 'AboutIntent';
    },
    async handle(handlerInput) {
        let speech = new Speech();
        speech.say("This application was made by Seniors at Bellevue College working on their Capstone for Computer Science.")

        return handlerInput.responseBuilder.speak(speech.ssml(true))
            .getResponse();
    },
}

