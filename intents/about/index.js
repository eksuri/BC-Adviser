const Speech = require('ssml-builder');
const schema = require('./_schema.json')
exports.schema = schema

exports.Handler = {
    canHandle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        return request.type === 'IntentRequest' && request.intent.name === 'AboutIntent';
    },
    async handle(handlerInput) {
        const responseBuilder = handlerInput.responseBuilder;

        let speech = new Speech();
        speech.say("This application was made by Seniors at Bellevue College working on their Capstone for Computer Science.")

        return responseBuilder.speak(speech.ssml(true))
                              .getResponse();
    },
}

