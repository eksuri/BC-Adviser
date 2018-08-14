const about = require('./about');
const amazon = require('./amazon');
const books = require('./books');
const classes = require('./classoffered');
const finals = require('./finals');
const recommended = require('./recommended');
const retake = require('./retake');
const schedule = require('./classschedule');
const instructors = require('./getInstructors');
const assignments = require('./assignments');
const quizzes = require('./quizzes');
const ratemyprof = require('./ratemyprofessor');

exports.handlers = [amazon.Handler,
                    about.Handler,
                    books.Handler,
                    classes.Handler,
                    finals.Handler,
                    instructors.Handler,
                    retake.Handler,
                    schedule.Handler,
                    assignments.Handler,
                    quizzes.Handler,
                    recommended.Handler,
                    ratemyprof.Handler];

exports.schemas = [
    assignments.schema,
    about.schema,
    amazon.schema,
    books.schema,
    classes.schema,
    finals.schema,
    recommended.schema,
    retake.schema,
    instructors.schema,
    schedule.schema,
    quizzes.schema,
    ratemyprof.schema,
]
