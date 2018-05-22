const Speech = require('ssml-builder');
const schema = require('./_schema.json')
exports.schema = schema

exports.AboutIntent = async function () {
    let speech = new Speech();
    speech.say("This application was made by Seniors at Bellevue College working on their Capstone for Computer Science.")
    this.emit(':tell', speech.ssml(true));
}

exports.Handler = {
    canHandle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        return request.type === 'IntentRequest' && request.intent.name === 'AboutIntent';
    },
    async handle(handlerInput) {
        const responseBuilder = handlerInput.responseBuilder;
        
        //const attributesManager = handlerInput.attributesManager;
        //const requestAttributes = attributesManager.getRequestAttributes();

        return responseBuilder
            .speak('This application was made by Seniors at Bellevue College working on their Capstone for Computer Science.')
            .getResponse();
    },
}

