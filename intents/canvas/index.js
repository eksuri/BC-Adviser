const Speech = require('ssml-builder');
const schema = require('./_schema.json')
exports.schema = schema

const canvas = require('../../common/canvas/index.js');

exports.Handler = {
    canHandle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        return request.type === 'IntentRequest' && request.intent.name === 'MyClassesIntent';
    },
    async handle(handlerInput) {
        let speech = new Speech();

        const responseBuilder = handlerInput.responseBuilder;
        courses = await canvas.getClasses();

        if (courses != null && courses[0] != null) {
            speech.say("This quarter you're currently enrolled in");
            courses.forEach((course) => speech.say(course));
        } else {
            speech.say("I'm not sure.");
        }


        return responseBuilder.speak(speech.ssml(true))
            .getResponse();
    },
}