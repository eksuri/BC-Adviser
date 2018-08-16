const Speech = require('ssml-builder');
const State = require('../../common/state.js');
const schema = require('./_schema.json')
exports.schema = schema

const sections = require('../../common/ctc/sections');
const texts = require('../../common/web/texts');

exports.Handler = [{
    canHandle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        return request.type === 'IntentRequest'
            && ["BookIntent"].includes(request.intent.name)
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
            && ["BookIntent"].includes(request.intent.name)
            && ["COMPLETED"].includes(request.dialogState);
    },
    async handle(handlerInput) {
        let speech = new Speech();
        let s = new State(handlerInput.requestEnvelope.request.intent.slots);
        const c = await sections.getCourseSections(s.fullQuarter, s.subject, s.number);

        if (c.length === 0) {
            speech.say("I'm sorry, I couldn't find that.")
        } else if (c.length > 1) {
            speech.say("There are")
                .say(c.length)
                .say("different sections available for")
                .say(s.subject)
                .say(s.number)
                .say("in")
                .say(s.quarter)
                .say(s.year)
                .pause("1s")
                .say("Please check online for your book.");
        } else {
            let books = await texts.getTexts(c[0].Yrq.FriendlyName, c[0].CourseSubject, c[0].CourseNumber, c[0].ID.ItemNumber);

            if (Array.isArray(books)) {
                if (books.includes("No Textbook Required")) {
                    speech.say("There are no recommended books for")
                          .say(s.subject)
                          .say(s.number)
                } else if (books[0] != null) {
                    speech.say("Books required for")
                          .say(s.subject)
                          .say(s.number)
                          .say("are")
                          .pause("1s");
                    for (let i = 1; i < books.length / 2; i++) {
                        speech.say(books[i*2 - 1])
                              .say("by")
                              .say(books[i*2]);
                    }
                } else {
                    speech.say("There are no recommended books for")
                          .say(s.subject)
                          .say(s.number)
                }
            } else {
                speech.say("I'm sorry, that's not working right now. Try online at bellevue college dot com.")
            }


        }

        return handlerInput.responseBuilder.speak(speech.ssml(true))
            .getResponse();
    },
}]