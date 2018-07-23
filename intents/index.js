const about = require('./about');
const amazon = require('./amazon');
const books = require('./books');
const classes = require('./classoffered');
const canvas = require('./canvas');
const degrees = require('./degrees');
const finals = require('./finals');
const rating = require('./professorRating');
const recommended = require('./recommended');
const retake = require('./retake');
const schedule = require('./classschedule');
const instructors = require('./getInstructors');
const conflict = require('./timeconflict');
const assignments = require('./assignments');

exports.handlers = [amazon.Handler,
                       about.Handler,
                       books.Handler,
                       canvas.Handler,
                       classes.Handler,
                       conflict.Handler,
                       degrees.Handler,
                       finals.Handler,
                       instructors.Handler,
                       rating.Handler,
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
    degrees.schema,
    finals.schema,
    rating.schema,
    recommended.schema,
    retake.schema,
    instructors.schema,
    conflict.schema,
    schedule.schema,
]
