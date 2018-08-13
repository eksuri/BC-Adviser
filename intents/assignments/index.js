const Speech = require('ssml-builder');
const State = require ('../../common/state.js');
const schema = require('./_schema.json')
exports.schema = schema

const canvas = require('../../common/canvas/index.js');

exports.Handler = [{
    canHandle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        return request.type === 'IntentRequest'
            && request.intent.name === 'GetAssignmentsIntent';
    },
    async handle(handlerInput) {
        let speech = new Speech();
        const assignments = await canvas.getAllAssignments();

        const assignments_count = assignments.reduce((a, b) => a + b.length, 0);

        if (assignments_count!= 0)
        {
            speech.say("You have")
                  .say(assignments_count)
                  .say("assignments.")
                  .pause("1s")
                  .say("Your assignments are");

            assignments.forEach((a) => {a.forEach((b) => {
                speech.say(b)
                      .pause("1s")});
            });

        }
        else {
            speech.say("You have no assignments");
        }        

        return handlerInput.responseBuilder.speak(speech.ssml(true))
            .getResponse();
    },
}]