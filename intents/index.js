const about= require('./about');
const amazon = require('./amazon');
const finals = require('./finals');

exports.handlers = {
    'AboutIntent': about.AboutIntent,
    'AMAZON.HelpIntent': amazon.HelpIntent,
    'AMAZON.CancelIntent': amazon.CancelIntent,
    'AMAZON.StopIntent': amazon.StopIntent,
    'Unhandled': amazon.Unhandled,
    'GetFinalsInfoIntent' : finals.GetFinalsInfoIntent
};