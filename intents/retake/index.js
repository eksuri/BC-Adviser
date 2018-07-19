const Speech = require('ssml-builder');
const schema = require('./_schema.json')
exports.schema = schema

const courses = require('../../common/ctc/courses');

exports.Handler = {
    canHandle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        return request.type === 'IntentRequest'
            && request.intent.name === 'RetakeClassIntent';
    },
    async handle(handlerInput) {
        let speech = new Speech();

        const responseBuilder = handlerInput.responseBuilder;
        const slots = handlerInput.requestEnvelope.request.intent.slots;

        const CourseAbbrev = slots.CourseAbbrev.value;
        const CourseNumber = slots.CourseNumber.value;

        const quarters = await courses.getQuartersOffered(CourseAbbrev, CourseNumber);

        speech.say("This class is offered at Bellevue College")

        quarters.forEach((q) => speech.say(q).pause("1s"));
        
        return responseBuilder.speak(speech.ssml(true))
            .getResponse();
    },
}
