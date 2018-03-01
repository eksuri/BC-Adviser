const about= require('./about');
const amazon = require('./amazon');
const finals = require('./finals');
const classes = require('./classes')

exports.handlers = {
    'AboutIntent': about.AboutIntent,
    'AMAZON.HelpIntent': amazon.HelpIntent,
    'AMAZON.CancelIntent': amazon.CancelIntent,
    'AMAZON.StopIntent': amazon.StopIntent,
    'Unhandled': amazon.Unhandled,
    'ClassesOfferedIntent' : classes.ClassesOfferedIntent,
    'GetFinalsInfoIntent' : finals.GetFinalsInfoIntent
};