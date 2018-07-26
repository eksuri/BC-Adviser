const Speech = require('ssml-builder');
const schema = require('./_schema.json')
exports.schema = schema

const ratings = require('../../common/web/ratings');


exports.Handler = [{
    canHandle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        return request.type === 'IntentRequest'
            && request.intent.name === 'RatingIntent';
    },
    async handle(handlerInput) {
        let speech = new Speech();

        const responseBuilder = handlerInput.responseBuilder;
        const slots = handlerInput.requestEnvelope.request.intent.slots;

        const firstName = slots.firstName.value;
        const lastName = slots.lastName.value;
        let speechOutput;

        if (firstName == "" || firstName == null || lastName == "" || lastName == null) {
            speech.say("You need to provide a full name.");
        } else {

            let rating = await ratings.getRating(firstName, lastName)

            if (rating == null) {
                speech.say("We couldn't find that professor's rating.");
            }
            else {
                speech.say("On a scale of 0 to 5, Professor")
                    .say(firstName)
                    .say(lastName)
                    .say("has an overall rating of")
                    .say(rating[0])
                    .say("and a level of difficulty of")
                    .say(rating[2])
                    .pause("1s")
                    .say(rating[1])
                    .say("percent of students would take Professor")
                    .say(lastName)
                    .say("again");
            }
        }

        return responseBuilder.speak(speech.ssml(true))
            .getResponse();


    },
}]