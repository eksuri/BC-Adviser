const Speech = require('ssml-builder');
const State = require ('../../common/state.js');
const schema = require('./_schema.json')
exports.schema = schema

const sections = require('../../common/ctc/sections');
const texts = require('../../common/web/texts');

exports.Handler =[ {
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
        const c = await sections.getCourseSection(s.fullQuarter, s.subject, s.number, s.id);

        //http://bellevue.verbacompare.com/comparison?id=F18__ART__101__0650

        let books = await texts.getTexts(c.Yrq.FriendlyName, c.CourseSubject, c.CourseNumber, c.ID.ItemNumber);
        let bookAndAuthor = "";

        if (books != null && books[0] != null) {
            i = 0;
            while (books[i] != null) {
                bookAndAuthor = bookAndAuthor + books[i] + ", by " + books[i + 1];
                if (books[i + 2] != null) {
                    bookAndAuthor = bookAndAuthor + ", ";
                }
                else {
                    bookAndAuthor = bookAndAuthor + ".";
                }
                i = i + 2;
            }

            if (bookAndAuthor.includes("No Textbook Required")) {
                speech.say("There are no recommended books for")
                    .say(s.subject)
                    .say(s.number)
                    .say("item number")
                    .say(s.courseId)
            }
            else {
                speech.say("Books required for")
                    .say(s.subject)
                    .say(s.number)
                    .say("item number")
                    .say(s.courseId)
                    .say("are")
                    .pause("1s")
                    .say(bookAndAuthor);
            }
        }
        else {
            speech.say("There are no recommended books for")
                .say(s.subject)
                .say(s.number)
                .say("item number")
                .say(s.courseId);
        }
        return handlerInput.responseBuilder.speak(speech.ssml(true))
            .getResponse();
    },
}]