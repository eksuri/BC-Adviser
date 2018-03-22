const schema = require('./_schema.json')
const events = require('./_events.json')
exports.schema = schema
exports.events = events

const EXAMPLE_MESSAGE = "Hello World";

exports.GetExampleIntent = function GetExampleIntent () {
    const speechOutput = EXAMPLE_MESSAGE
    this.response.speak(speechOutput);
    this.emit(':responseReady');
}