const Speech = require('ssml-builder');
const State = require ('../../common/state.js');
const schema = require('./_schema.json')
exports.schema = schema

const assignments = require('../../common/canvas/index.js');

exports.Handler = {
    canHandle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        return request.type === 'IntentRequest'
            && request.intent.name === 'GetAssignmentsIntent';
    },
    async handle(handlerInput) {
        let speech = new Speech();
        const assignmentNames = await assignments.getAllAssignments();

        speech.say("Your assignments for this quarter are: ");
        assignmentNames.forEach((d) => {
            d.forEach((e) => {
                speech.say(e)
                    .pause("1s");
            });
        });

        return handlerInput.responseBuilder.speak(speech.ssml(true))
            .getResponse();
    },
}


