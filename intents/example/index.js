const schema = require('./_schema.json')
exports.schema = schema

const EXAMPLE_MESSAGE = "Hello World";

exports.GetExampleIntent = function GetExampleIntent () {
    const speechOutput = EXAMPLE_MESSAGE
    this.response.speak(speechOutput);
    this.emit(':responseReady');
}