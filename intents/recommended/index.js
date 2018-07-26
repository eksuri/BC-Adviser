const Speech = require('ssml-builder');
const schema = require('./_schema.json')
exports.schema = schema

const courses = require('../../common/ctc/courses.js');

exports.inProgress = {
    canHandle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        return request.type === 'IntentRequest'
            && ["RecommendedIntent", "PrerequisiteIntent"].includes(request.intent.name)
            && ["STARTED", "IN_PROGRESS"].includes(request.dialogState);
    },
    async handle(handlerInput) {
        const currentIntent = handlerInput.requestEnvelope.request.intent;
        return handlerInput.responseBuilder
            .addDelegateDirective(currentIntent)
            .getResponse();
    },
}


exports.Completed = {
    canHandle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        return request.type === 'IntentRequest'
            && ["RecommendedIntent", "PrerequisiteIntent"].includes(request.intent.name)
            && ["COMPLETED"].includes(request.dialogState);
    },
    async handle(handlerInput) {
        let speech = new Speech();
        const responseBuilder = handlerInput.responseBuilder;

        const subject = handlerInput.requestEnvelope.request.intent.slots.subject.value;
        const number = handlerInput.requestEnvelope.request.intent.slots.number.value;

        const which = handlerInput.requestEnvelope.request.intent.name === "RecommendedIntent"

        footnote = (which ? await courses.getRecommended(subject, number) :
            await courses.getPrerequisite(subject, number));

        if (footnote) {
            speech.say((which ? "recommended" : "prerequisites"))
                .say("for")
                .say(subject)
                .say(number)
                .say("include")
                .say(footnote)
        } else {
            speech.say("There are no")
                .say((which ? "recommended" : "prerequisites"))
                .say("for you to take before")
                .say(subject)
                .say(number)
        }

        return responseBuilder.speak(speech.ssml(true))
            .getResponse();
    },
}

