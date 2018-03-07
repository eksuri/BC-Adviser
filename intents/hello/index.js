const schema = require('./_schema.json')
exports.schema = schema

const EXAMPLE_MESSAGE = "Hello World";

exports.HelloWorldIntent = function HelloWorldIntent () {
    const speechOutput = EXAMPLE_MESSAGE;
    console.log(speechOutput);
    this.response.speak(speechOutput);
    this.emit(':responseReady');
}