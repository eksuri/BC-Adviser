const about= require('./about');
const amazon = require('./amazon');
const classes = require('./classes');
const degrees = require('./degrees');
const finals = require('./finals');
const example = require('./example');
const timeConflict = require('./timeConflict');

exports.handlers = {
    'AboutIntent': about.AboutIntent,
    'AMAZON.HelpIntent': amazon.HelpIntent,
    'AMAZON.CancelIntent': amazon.CancelIntent,
    'AMAZON.StopIntent': amazon.StopIntent,
    'Unhandled': amazon.Unhandled,
    'ClassesOfferedIntent' : classes.ClassesOfferedIntent,
    'BellevueDegrees' :  degrees.GetBellevueDegreesIntent,
    'GetFinalsInfoIntent' : finals.GetFinalsInfoIntent,
    'ExampleIntent': example.GetExampleIntent,
    'TimeConflictIntent': timeConflict.TimeConflictIntent
};

exports.schemas = [
    about.schema,
    amazon.schema,
    classes.schema,
    degrees.schema,
    finals.schema,
    example.schema,
    timeConflict.schema
]