﻿const about = require('./about');
const amazon = require('./amazon');
const books = require('./books');
const classes = require('./classoffered');
const canvas = require('./canvas');
const degrees = require('./degrees');
const finals = require('./finals');
const recommended = require('./recommended');
const retake = require('./retake');
const schedule = require('./classschedule');
const instructors = require('./getInstructors');
//const schedule = require('./classschedule');


exports.handlers = {
    'AMAZON.HelpIntent': amazon.HelpIntent,
    'AMAZON.CancelIntent': amazon.CancelIntent,
    'AMAZON.StopIntent': amazon.StopIntent,
    'BookIntent': books.GetBookIntent,
    //'Unhandled': amazon.Unhandled,
    'ClassesOfferedIntent' : classes.ClassesOfferedIntent,
    'MyClassesIntent': canvas.GetMyClasses,
    'MyGradesIntent': canvas.GetMyGrades,
    'Degrees' :  degrees.GetBellevueDegreesIntent,
    'GetFinalsInfoIntent' : finals.GetFinalsInfoIntent,
    //'RecommendedIntent': recommended.GetRecommendedIntent,
    //'PrerequisiteIntent': recommended.GetPrerequisiteIntent,
    'RetakeClassIntent': retake.RetakeClassIntent,
    'ClassScheduleIntent': schedule.ClassScheduleIntent,
    'GetInstructorsIntent': instructors.getInstructors,
};

exports.handlers_v2 = [recommended.Handler, about.Handler];

exports.schemas = [
    about.schema,
    amazon.schema,
    books.schema,
    canvas.schema,
    classes.schema,
    degrees.schema,
    finals.schema,
    recommended.schema,
    retake.schema,
    instructors.schema
]
