const about= require('./about');
const amazon = require('./amazon');
const canvas = require('./canvas');
const classes = require('./classoffered');
const common = require('./common_types');
const degrees = require('./degrees');
const finals = require('./finals');
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
    'MyClassesIntent': canvas.GetMyClasses,
    'MyGradesIntent': canvas.GetMyGrades,
    'RecommendedIntent': recommended.GetRecommendedIntent,
    'PrerequisiteIntent': recommended.GetPrerequisiteIntent,
    'RetakeClassIntent': retake.RetakeClassIntent
};

exports.schemas = [
    about.schema,
    amazon.schema,
    canvas.schema,
    classes.schema,
    common.schema,
    degrees.schema,
    finals.schema,
    recommended.schema,
    retake.schema
]