const schema = require('./_schema.json')
const event = require('./_event.json')
exports.schema = schema
exports.event = event

const HELP_MESSAGE = "You can ask me which days finals, or you can exit... What can I help you with?";
const HELP_REPROMPT = "What can I help you with?";
const STOP_MESSAGE = "Goodbye!";
const IDK_MESSAGE = "I'm not sure I follow...";

exports.HelpIntent = function HelpIntent() {
    const speechOutput = HELP_MESSAGE;
    const reprompt = HELP_REPROMPT;

    this.response.speak(speechOutput).listen(reprompt);
    this.emit(':responseReady');
}

exports.CancelIntent = function HelpIntent() {
    this.response.speak(STOP_MESSAGE);
    this.emit(':responseReady');
},
exports.StopIntent = function StopIntent() {
    this.response.speak(STOP_MESSAGE);
    this.emit(':responseReady');
}

exports.Unhandled = function Unahndled() {
    const speechOutput = IDK_MESSAGE;
    this.emit(':responseReady');
}