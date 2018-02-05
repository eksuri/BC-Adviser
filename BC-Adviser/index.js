'use strict';
const Alexa = require('alexa-sdk');
const finals = require('./finals');


const APP_ID = "amzn1.ask.skill.2ff580cc-00a9-40d4-9a88-115f9a2f1ec2";
const ABOUT_MESSAGE = "This application was made by Seniors at Bellevue College working on their Capstone for Computer Science.";
const FINALS_MESSAGE = "I don't currently know when finals are."
const HELP_MESSAGE = "You can ask me which days finals, or you can exit... What can I help you with?";
const HELP_REPROMPT = "What can I help you with?";
const IDK_MESSAGE = "I'm not sure I follow...";
const STOP_MESSAGE = "Goodbye!";

exports.handler = function (event, context, callback) {
    const alexa = Alexa.handler(event, context, callback);
    alexa.appId = APP_ID;
    alexa.registerHandlers(handlers);
    alexa.execute();
};

const handlers = {
    'GetFinalsInfoIntent': function () {
        finals.getDates((dates) => { // get array of finals dates
            const speechOutput = "Finals this quarter start on " + dates.shift() + " and last until " + dates.pop();
            this.response.speak(speechOutput);
            this.emit(':responseReady');
        });
    },
    'AboutIntent': function () {
        const speechOutput = ABOUT_MESSAGE
        this.response.speak(speechOutput);
        this.emit(':responseReady');
    },
    'AMAZON.HelpIntent': function () {
        const speechOutput = HELP_MESSAGE;
        const reprompt = HELP_REPROMPT;

        this.response.speak(speechOutput).listen(reprompt);
        this.emit(':responseReady');
    },
    'AMAZON.CancelIntent': function () {
        this.response.speak(STOP_MESSAGE);
        this.emit(':responseReady');
    },
    'AMAZON.StopIntent': function () {
        this.response.speak(STOP_MESSAGE);
        this.emit(':responseReady');
    },
    'Unhandled': function () {
        const speechOutput = HELP_MESSAGE;
    }
};