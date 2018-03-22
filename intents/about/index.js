const schema = require('./_schema.json')
const events = require('./_events.json')
exports.schema = schema
exports.events = events

const ABOUT_MESSAGE = "This application was made by Seniors at Bellevue College working on their Capstone for Computer Science.";

exports.AboutIntent = function AboutIntent () {
    const speechOutput = ABOUT_MESSAGE
    this.response.speak(speechOutput);
    this.emit(':responseReady');
}