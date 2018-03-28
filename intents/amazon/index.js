const schema = require('./_schema.json')
exports.schema = schema

const IDK_MESSAGE = "I'm not sure I follow...";
const HELP_MESSAGE = "You can ask me which days finals, or you can exit... What can I help you with?";
const HELP_REPROMPT = "What can I help you with?";
const STOP_MESSAGE = "Goodbye!";


exports.CancelIntent = function () {
    this.response.speak(STOP_MESSAGE);
    this.emit(':responseReady');
};

exports.HelpIntent = function () {
    const speechOutput = HELP_MESSAGE;
    const reprompt = HELP_REPROMPT;

    this.response.speak(speechOutput).listen(reprompt);
    this.emit(':responseReady');
};

exports.StopIntent = function () {
    this.response.speak(STOP_MESSAGE);
    this.emit(':responseReady');
};

exports.Unhandled = function () {
    const speechOutput = IDK_MESSAGE;
    this.emit(':responseReady');
}