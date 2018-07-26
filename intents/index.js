const about = require('./about');
const amazon = require('./amazon');
const books = require('./books');
const classes = require('./classoffered');
const canvas = require('./canvas');
const finals = require('./finals');
const recommended = require('./recommended');
const retake = require('./retake');
const schedule = require('./classschedule');
const instructors = require('./getInstructors');
const assignments = require('./assignments');

exports.handlers = [amazon.Handler,
                       about.Handler,
                       books.Handler,
                       canvas.Handler,
                       classes.Handler,
                       finals.Handler,
                       instructors.Handler,
                       retake.Handler,
                       schedule.Handler,
                       assignments.Handler,
                       recommended.inProgress,
                       recommended.Completed];

exports.schemas = [
    assignments.schema,
    about.schema,
    amazon.schema,
    books.schema,
    canvas.schema,
    classes.schema,
    finals.schema,
    recommended.schema,
    retake.schema,
    instructors.schema,
    schedule.schema,
]
