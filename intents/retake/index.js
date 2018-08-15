const Speech = require('ssml-builder');
const State = require ('../../common/state.js');
const schema = require('./_schema.json')
exports.schema = schema

const courses = require('../../common/ctc/courses');

exports.Handler =[ {
    canHandle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        return request.type === 'IntentRequest'
            && ["RetakeClassIntent"].includes(request.intent.name)
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
            && ["RetakeClassIntent"].includes(request.intent.name)
            && ["COMPLETED"].includes(request.dialogState);
    },
    async handle(handlerInput) {
        let speech = new Speech();
        let s = new State(handlerInput.requestEnvelope.request.intent.slots);
        const quarters = await courses.getQuartersOffered(s.subject, s.number);

        const projected_quarters = quarters.map((q) => {
            const p = q.split(" ");
            if (parseInt(q[1]) > s.year) { // it's already ahead a year
                return q;
            } else if (parseInt(p[1]) < s.year) { // it's behind a year
                p[1]++;
                return p[0].concat(" ", p[1].toString());
            } else { // same year
                if (p[0].toLowerCase() === s.quarter || s.quarter === 'fall' || p[0].toLowerCase() === 'winter' || (p[0].toLowerCase() === 'spring' && s.quarter === 'summer')) {
                    p[1]++;
                    return p[0].concat(" ", p[1].toString());
                } else {
                    return q;
                }
            }
        })

        speech.say("This class is offered at Bellevue College")

        projected_quarters.forEach((q) => speech.say(q).pause("1s"));
        
        return handlerInput.responseBuilder.speak(speech.ssml(true))
            .getResponse();
    },
}]