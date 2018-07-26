const Speech = require('ssml-builder');
const schema = require('./_schema.json')
exports.schema = schema

const sections = require('../../common/ctc/sections.js');

exports.Handler = {
    canHandle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        return request.type === 'IntentRequest'
            && request.intent.name === 'ClassesOfferedIntent';
    },
    async handle(handlerInput) {
        let speech = new Speech();

        const responseBuilder = handlerInput.responseBuilder;
        const slots = handlerInput.requestEnvelope.request.intent.slots;

        const quarter = (slots.quarter.value == "autumn" ? "fall" : slots.quarter.value);
        const year = slots.year.value;
        const subject = slots.subjects.value;


        coursesOffered = await sections.getCoursesOffered(quarter + year, subject);

        speech.say("The following")
            .say(subject)
            .say("classes are offered")
            .say(quarter)
            .say(year)
            .pause("1s")

        coursesOffered.forEach((c) => {
            speech.say(c)
        }
        );

        return responseBuilder.speak(speech.ssml(true))
            .getResponse();
    }
}

