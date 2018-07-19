const Speech = require('ssml-builder');
const schema = require('./_schema.json')
exports.schema = schema

const finals = require('../../common/web/finals.js');

exports.Handler = {
    canHandle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        return request.type === 'IntentRequest'
            && request.intent.name === 'GetFinalsInfoIntent';
    },
    async handle(handlerInput) {
        let speech = new Speech();
        
        const responseBuilder = handlerInput.responseBuilder;

        const dates = await finals.getDates((new Date()).getMonth());

        speech.say("Finals this quarter start on")
            .say(dates.shift())
            .say("and last until")
            .say(dates.pop());

        return responseBuilder.speak(speech.ssml(true))
            .getResponse();
    },
}


