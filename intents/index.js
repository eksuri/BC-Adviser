﻿const about= require('./about');
const amazon = require('./amazon');
const classes = require('./classoffered');
const degrees = require('./degrees');
const finals = require('./finals');
const example = require('./example');
const recommended = require('./recommended');
const retake = require('./retake');
const minimumgrades = require('./minimumgrades');

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
    'MinimumGradeIntent': minimumgrades.MinimumGradeIntent,
    'ExampleIntent': example.GetExampleIntent
};

exports.schemas = [
    about.schema,
    amazon.schema,
    classes.schema,
    degrees.schema,
    finals.schema,
    recommended.schema,
    retake.schema,
    minimumgrades.schema,
    example.schema
]