const about= require('./about');
const amazon = require('./amazon');
const classes = require('./classoffered');
const common = require('./common_types');
const degrees = require('./degrees');
const finals = require('./finals');
const example = require('./example');
const recommended = require('./recommended');
const retake = require('./retake');

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
    'RecommendedIntent': recommended.GetRecommendedIntent,
    'PrerequisiteIntent': recommended.GetPrerequisiteIntent,
    'RetakeClassIntent': retake.RetakeClassIntent,
    'ExampleIntent': example.GetExampleIntent
};

exports.schemas = [
    about.schema,
    amazon.schema,
    classes.schema,
    common.schema,
    degrees.schema,
    finals.schema,
    recommended.schema,
    retake.schema,
    example.schema
]

exports.events = [
    //about.events,
    //amazon.events,
    //classes.events,
    //degrees.events,
    finals.event,
    //recommended.events,
    //retake.events,
    example.event
]