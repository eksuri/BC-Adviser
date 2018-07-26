const Speech = require('ssml-builder');
const State = require ('../../common/state.js');
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
        const dates = await finals.getDates((new Date()).getMonth());

        speech.say("Finals this quarter start on")
            .say(dates.shift())
            .say("and last until")
            .say(dates.pop());

        return handlerInput.responseBuilder.speak(speech.ssml(true))
            .getResponse();
    },
}


