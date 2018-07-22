const Speech = require('ssml-builder');
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
        
        const responseBuilder = handlerInput.responseBuilder;

        const assignmentNames = await assignments.getAllAssignments();

        console.log(assignmentNames);

        speech.say("Your assignments for this quarter are: ");
        assignmentNames.forEach((d) => {
            speech.say(d)
                  .pause("1s");
        });

        return responseBuilder.speak(speech.ssml(true))
            .getResponse();
    },
}


