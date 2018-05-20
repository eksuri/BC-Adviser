const Speech = require('ssml-builder');
const schema = require('./_schema.json')
exports.schema = schema

exports.CancelIntent = async function () {
    let speech = new Speech();
    speech.say("Goodbye!")
    this.emit(':tell', speech.ssml(true));
};

exports.HelpIntent = async function () {
    let speech = new Speech();
    let reprompt = new Speech();
    
    speech.say("You can ask me which days finals, or you can exit")
    .pause("1s")
          .say("What can I help you with?");

    reprompt.say("What can I help you with?");

    this.emit(':ask', speech.ssml(true), reprompt.ssml(true));
};

exports.StopIntent = async function () {
    let speech = new Speech();
    speech.say("Goodbye!")
    this.emit(':tell', speech.ssml(true));
};

exports.Unhandled = async function () {
    let speech = new Speech();
    speech.say("I'm not sure I follow")
    this.emit(':tell', speech.ssml(true));
}