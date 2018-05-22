const about= require('./about');
const amazon = require('./amazon');
const classes = require('./classoffered');
const canvas = require('./canvas');
const degrees = require('./degrees');
const finals = require('./finals');
const recommended = require('./recommended');
const retake = require('./retake');

exports.handlers = {
    'AMAZON.HelpIntent': amazon.HelpIntent,
    'AMAZON.CancelIntent': amazon.CancelIntent,
    'AMAZON.StopIntent': amazon.StopIntent,
    //'Unhandled': amazon.Unhandled,
    'ClassesOfferedIntent' : classes.ClassesOfferedIntent,
    'MyClassesIntent': canvas.GetMyClasses,
    'MyGradesIntent': canvas.GetMyGrades,
    'Degrees' :  degrees.GetBellevueDegreesIntent,
    'GetFinalsInfoIntent' : finals.GetFinalsInfoIntent,
    'RecommendedIntent': recommended.GetRecommendedIntent,
    'PrerequisiteIntent': recommended.GetPrerequisiteIntent,
    'RetakeClassIntent': retake.RetakeClassIntent
};

exports.handlers_v2 = about.Handler;

exports.schemas = [
    about.schema,
    amazon.schema,
    canvas.schema,
    classes.schema,
    degrees.schema,
    finals.schema,
    recommended.schema,
    retake.schema
]
