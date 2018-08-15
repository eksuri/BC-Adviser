const Speech = require('ssml-builder');
const schema = require('./_schema.json')
exports.schema = schema

const degrees = require('../../common/web/degrees.js');

exports.Handler = [ {
    canHandle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        return request.type === 'IntentRequest'
            && request.intent.name === 'BellevueDegrees';
    },
    async handle(handlerInput) {
        let speech = new Speech();

        const responseBuilder = handlerInput.responseBuilder;
        const slots = handlerInput.requestEnvelope.request.intent.slots;
    
        const degree_type = slots.program.value;
    
        if (degrees.list.includes(degree_type)) {
            const list_of_degrees = await degrees.getDegrees(degree_type);
            
            speech.say(degree_type)
                  .say("degrees include");
    
            list_of_degrees.forEach((d) => {
                speech.say(d)
                      .pause("1s");
            });
        } else {
            speech.say("That is not avaliable at this time");
        }
    
        return responseBuilder.speak(speech.ssml(true))
        .getResponse();
    },
}]