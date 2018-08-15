const about = require('./about');
const amazon = require('./amazon');
const books = require('./books');
const classes = require('./classoffered');
const degrees = require('./degrees')
const finals = require('./finals');
const instructors = require('./getInstructors');
const ratemyprof = require('./ratemyprofessor');
const recommended = require('./recommended');
const retake = require('./retake');
const schedule = require('./classschedule');
const scholarship = require('./scholarships');

exports.handlers = [
    about.Handler,
    amazon.Handler,
    books.Handler,
    classes.Handler,
    degrees.Handler,
    finals.Handler,
    instructors.Handler,
    ratemyprof.Handler,
    recommended.Handler,
    retake.Handler,
    schedule.Handler,
    scholarship.Handler,
];

exports.schemas = [
    about.schema,
    amazon.schema,
    books.schema,
    classes.schema,
    degrees.schema,
    finals.schema,
    instructors.schema,
    ratemyprof.schema,
    recommended.schema,
    retake.schema,
    schedule.schema,
    scholarship.schema,
]
