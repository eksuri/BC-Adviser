const Speech = require('ssml-builder');
const State = require ('../../common/state.js');
const schema = require('./_schema.json')
exports.schema = schema

const canvas = require('../../common/canvas/index.js');

exports.Handler = [{
    canHandle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        return request.type === 'IntentRequest'
            && request.intent.name === 'GetQuizzesIntent';
    },
    async handle(handlerInput) {
        let speech = new Speech();
        quizzes = await canvas.getAllQuizzes();

        if (quizzes != null && quizzes[0] != null) {
            speech.say("You have the following quizzes: ");
            quizzes.forEach((course) => {
                course.forEach((quizz) => speech.say(quizz));
            });
        } else {
            speech.say("You are lucky, you have no quizzes!");
        }

        return handlerInput.responseBuilder.speak(speech.ssml(true))
            .getResponse();
    },
}]