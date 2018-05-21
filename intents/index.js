const about= require('./about');
const amazon = require('./amazon');
const classes = require('./classoffered');
const canvas = require('./canvas');
const common = require('./common_types');
const finals = require('./finals');
const recommended = require('./recommended');
const retake = require('./retake');
/*
const degrees = require('./degrees');
*/

exports.handlers = {
    'MyClassesIntent': canvas.GetMyClasses,
    'MyGradesIntent': canvas.GetMyGrades,
    'RecommendedIntent': recommended.GetRecommendedIntent,
    'PrerequisiteIntent': recommended.GetPrerequisiteIntent,
    'AboutIntent': about.AboutIntent,
    'AMAZON.HelpIntent': amazon.HelpIntent,
    'AMAZON.CancelIntent': amazon.CancelIntent,
    'AMAZON.StopIntent': amazon.StopIntent,
    'Unhandled': amazon.Unhandled,
    'ClassesOfferedIntent' : classes.ClassesOfferedIntent,
    'GetFinalsInfoIntent' : finals.GetFinalsInfoIntent,
    'RetakeClassIntent': retake.RetakeClassIntent
    /*
    'BellevueDegrees' :  degrees.GetBellevueDegreesIntent,
    */
};
/*
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
*/