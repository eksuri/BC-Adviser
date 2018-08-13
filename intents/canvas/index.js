const Speech = require('ssml-builder');
const State = require ('../../common/state.js');
const schema = require('./_schema.json')
exports.schema = schema

const canvas = require('../../common/canvas/index.js');

exports.Handler = [{
    canHandle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        return request.type === 'IntentRequest'
            && ["MyClassesIntent", "MyGradesIntent"].includes(request.intent.name)
    },
    async handle(handlerInput) {
        let speech = new Speech();
        const courses = await canvas.getCanvasGrades();

        if (courses != null && courses[0] != null) {
            speech.say("This quarter you're currently enrolled in")
            courses.forEach((course) => speech.say(course[0]).pause("1s"));

            if (handlerInput.requestEnvelope.request.intent.name === "MyGradesIntent") {
                    speech.say("Your grades for each course are");
                    courses.forEach((course) => speech.say(course[0]).pause("1s").say(course[1]).pause("1s"));
            }

        } else {
            speech.say("I'm not sure.");
        }

        return handlerInput.responseBuilder.speak(speech.ssml(true))
            .getResponse();
    },
}]