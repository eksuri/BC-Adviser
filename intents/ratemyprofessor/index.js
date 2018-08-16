const Speech = require('ssml-builder');
const State = require ('../../common/state.js');
const schema = require('./_schema.json')
exports.schema = schema

const sections = require('../../common/ctc/sections.js');
const ratemyprofessor = require('../../common/web/ratemyprofessor');

exports.Handler =[ {
    canHandle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        return request.type === 'IntentRequest'
            && ["RatingIntent"].includes(request.intent.name)
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
            && ["RatingIntent"].includes(request.intent.name)
            && ["COMPLETED"].includes(request.dialogState);
    },
    async handle(handlerInput) {
        let speech = new Speech();
        let s = new State(handlerInput.requestEnvelope.request.intent.slots);

        // take note of how we get the fullQuarter, subject, and number from the object 's'
        const instructors = await sections.getInstructors(s.fullQuarter, s.subject, s.number);
        
        if (!Array.isArray(instructors)) {
            speech.say("That isn't working right now, sorry!")
        } else if (instructors.length == 0) {
            speech.say("There are no instructors for")
                  .say(s.subject)
                  .say(s.number);
        } else {
            const instructor_ratings = instructors.map(async (instructor) => {
                const fullname = instructor.split(" ");
                rating = await ratemyprofessor.getRating(fullname[0], fullname[1]);
                return { "name": instructor, "rating": rating};
            });
            const ratings = await Promise.all(instructor_ratings).then((completed) => { return completed });
            const filtered_ratings = ratings.filter((r) => r.rating != null); 

            if (filtered_ratings.length == 0) {
                speech.say("None of the professors teaching")
                      .say(s.subject)
                      .say(s.number)
                      .say("are rated at rate my professor dot com"); 
            } else {
                const sorted_ratings = filtered_ratings.sort((r1, r2) => {return r2.rating.quality - r1.rating.quality});
                speech.say("The highest rated professor for")
                      .say(s.subject)
                      .say(s.number)
                      .say("is")
                      .say(sorted_ratings[0].name)
                      .say("with a rating of")
                      .say(sorted_ratings[0].rating.quality);
        
            }
        }

        return handlerInput.responseBuilder.speak(speech.ssml(true))
            .getResponse();
    },
}]