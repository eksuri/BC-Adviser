const Speech = require('ssml-builder');
const schema = require('./_schema.json')
exports.schema = schema



exports.Handler = {
    canHandle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        return request.type === 'IntentRequest'
            && ["AMAZON.HelpIntent", "AMAZON.CancelIntent", "Amazon.StopIntent"].includes(request.intent.name)
    },
    async handle(handlerInput) {
        let speech = new Speech();

        if(request.intent.name == "AMAZON.HelpIntent") {
            speech.say("You can ask me which days finals, or you can exit")
                  .pause("1s")
                  .say("What can I help you with?");
        } else {
            speech.say("Goodbye!")
        }

        return responseBuilder.speak(speech.ssml(true))
            .getResponse();
    }, 
}