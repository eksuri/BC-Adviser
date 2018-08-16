const Speech = require('ssml-builder');
const State = require('../../common/state.js');
const schema = require('./_schema.json')
exports.schema = schema

const sections = require('../../common/ctc/sections');


exports.Handler = [{
    canHandle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        return request.type === 'IntentRequest'
            && ["TimeConflictIntent"].includes(request.intent.name)
            && ["STARTED", "IN_PROGRESS"].includes(request.dialogState);
    },
    async handle(handlerInput) {
        const currentIntent = handlerInput.requestEnvelope.request.intent;
        return handlerInput.responseBuilder
            .addDelegateDirective(currentIntent)
            .getResponse();
    },
},
{
    canHandle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        return request.type === 'IntentRequest'
            && ["TimeConflictIntent"].includes(request.intent.name)
            && ["COMPLETED"].includes(request.dialogState);
    },
    async handle(handlerInput) {
        let speech = new Speech();
        let slots = handlerInput.requestEnvelope.request.intent.slots;

        let s1 = new State({
            "subject": slots.subjectOne,
            "number": slots.numberOne,
            "quarter": slots.quarter,
            "year": slots.year
        });

        let s2 = new State({
            "subject": slots.subjectTwo,
            "number": slots.numberTwo,
            "quarter": slots.quarter,
            "year": slots.year
        });

        let no_conflict = await sections.CompareCourseSchedule(s1, s2);
        if (no_conflict === null) {
            speech.say("I'm sorry, I can't find that.");
        } else if (no_conflict) {
            speech.say("Of course, you can take both")
                  .say(s1.subject)
                  .say(s1.number)
                  .say("and")
                  .say(s2.subject)
                  .say(s2.number)
                  .say(s2.quarter)
                  .say(s2.year)
        }
        else {
            speech.say("You cannot take both")
                  .say(s1.subject)
                  .say(s1.number)
                  .say("and")
                  .say(s2.subject)
                  .say(s2.number)
                  .say(s2.quarter)
                  .say(s2.year)

        }
        return handlerInput.responseBuilder.speak(speech.ssml(true))
            .getResponse();
    }
}]