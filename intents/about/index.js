const schema = require('./_schema.json')
exports.schema = schema

const ABOUT_MESSAGE = "This application was made by Seniors at Bellevue College working on their Capstone for Computer Science.";

exports.AboutIntent = function () {
    const speechOutput = ABOUT_MESSAGE;
    this.response.speak(speechOutput);
    this.emit(':responseReady');
}