const Speech = require('ssml-builder');
const schema = require('./_schema.json')
exports.schema = schema

const courses = require('../../common/ctc/courses.js');

exports.Handlers = {
    canHandle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        return request.type === 'IntentRequest' && ["RecommendedIntent", "PrerequisiteIntent"].includes(request.intent.name);
    },
    async handle(handlerInput) {
        let speech = new Speech();
        const responseBuilder = handlerInput.responseBuilder;

        const CourseAbbrev = handlerInput.requestEnvelope.request.intent.slots.CourseAbbrev.value;
        const CourseNumber = handlerInput.requestEnvelope.request.intent.slots.CourseNumber.value;

        const which = handlerInput.requestEnvelope.request.intent.name === "RecommendedIntent"
        
        footnote = (which ? await courses.getRecommended(CourseAbbrev, CourseNumber):
                            await courses.getPrerequisite(CourseAbbrev, CourseNumber));

        if (footnote) {
            speech.say((which?"recommended":"prerequisites"))
                  .say("for")
                  .say(CourseAbbrev)
                  .say(CourseNumber)
                  .say("include")
                  .say(footnote)
        } else {
            speech.say("There are no")
                  .say((which?"recommended":"prerequisites"))
                  .say("for you to take before")
                  .say(CourseAbbrev)
                  .say(CourseNumber)
        }

        return responseBuilder.speak(speech.ssml(true))
                              .getResponse();
    },
}

