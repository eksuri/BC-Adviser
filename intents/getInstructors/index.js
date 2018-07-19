const Speech = require('ssml-builder');
const schema = require('./_schema.json')
exports.schema = schema

const sections = require('../../common/ctc/sections.js');

exports.Handler = {
    canHandle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        return request.type === 'IntentRequest'
            && request.intent.name === 'GetInstructorsIntent';
    },
    async handle(handlerInput) {
        let speech = new Speech();

        const responseBuilder = handlerInput.responseBuilder;
        const slots = handlerInput.requestEnvelope.request.intent.slots;

        const quarter = (slots.Quarter.value == "autumn" ? "fall" : slots.Quarter.value);
        const year = slots.Year.value;
        const subject = slots.Subjects.value;
        const number = slots.Number.value;

        const instructors = await sections.getInstructors(quarter + year, number, subject);

        speech.say("The instructors for")
            .say(subject)
            .say(number)
            .say("in")
            .say(quarter)
            .say(year)
            .say("are")
        instructors.forEach((i) => {
            speech.say(i);
        })

        return responseBuilder.speak(speech.ssml(true))
            .getResponse();
    },
}



