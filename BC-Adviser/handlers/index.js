const finals = require('./finals');

const ABOUT_MESSAGE = "This application was made by Seniors at Bellevue College working on their Capstone for Computer Science.";
const HELP_MESSAGE = "You can ask me which days finals, or you can exit... What can I help you with?";
const HELP_REPROMPT = "What can I help you with?";
const STOP_MESSAGE = "Goodbye!";
const IDK_MESSAGE = "I'm not sure I follow...";


exports.handlers = {
    'GetFinalsInfoIntent' : finals.GetFinalsInfoIntent,
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
        const speechOutput = IDK_MESSAGE;
    }
};