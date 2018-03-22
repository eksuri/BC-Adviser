const schema = require('./_schema.json')
const event = require('./_event.json')
exports.schema = schema
exports.event = event

const EXAMPLE_MESSAGE = "Hello World";

exports.GetExampleIntent = function GetExampleIntent () {
    const speechOutput = EXAMPLE_MESSAGE
    this.response.speak(speechOutput);
    this.emit(':responseReady');
}