const Speech = require('ssml-builder');
const State = require ('../../common/state.js');
const schema = require('./_schema.json')
exports.schema = schema

const sections = require('../../common/ctc/sections.js');
const ratings = require('../../common/web/ratings');

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

        if (instructors.length == 0) {
            speech.say("There are no instructors for " + s.subject + " " + s.number);
        }
        else {
            let numOfInstructors = instructors.length;
            atLeastOneRating = false;
            let highestRating = 0;
            let indexOfHighestRating = 0;
            var i;
            for (i = 0; i < numOfInstructors; i++) {
                if (instructors[i] !== "") 
                {
                    instructorFirstLast = instructors[i].split(" ");
                
                    rating = await ratings.getRating(instructorFirstLast[0], instructorFirstLast[1]);
                    if (rating !== null && rating !== undefined && rating.length > 0) {
                        atLeastOneRating = true;
                        console.log(instructorFirstLast[0]);
                        console.log(instructorFirstLast[1]);
                        console.log(rating);
                        if (rating[0] > highestRating) {
                            highestRating = rating[0];
                            indexOfHighestRating = i;
                        }
                    }   
                }
            }

            if (atLeastOneRating == true) {
                speech.say("The highest rated professor for " + s.subject + " " + s.number + " is " + instructors[indexOfHighestRating] + " with a rating of " + highestRating);
            } 
            else {
                speech.say("None of the professors teaching " + s.subject + " " + s.number + " are rated at rate my professor dot com"); 
            }

        }

        


        // instructors should be an array of full instructor names as strings.
        // for each instructor in the array, call ratings.getRating(Firstname, Lastname);
        // split the strings based off of the first space to get the first and last name,
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String



        // then compare all the responses to figure out who is the highest rated professor and return that
        
        //have some responses if there are no instructors, or none with ratings, or other edge cases.



        /*
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
*/
        return handlerInput.responseBuilder.speak(speech.ssml(true))
            .getResponse();
    },
}]