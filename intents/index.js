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
const scholarships = require('./scholarships');


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
    'RatingIntent': rating.GetProfessorRatingIntent,
    'RetakeClassIntent': retake.RetakeClassIntent,
    'ClassScheduleIntent': schedule.ClassScheduleIntent,
    'TimeConflictIntent': conflict.TimeConflictIntent,
    'GetInstructorsIntent': instructors.getInstructors,
    'ScholarshipIntent': scholarships.GetScholarshipIntent,
};

exports.handlers_v2 = [about.Handler,
                       recommended.Handler];

exports.schemas = [
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
    scholarships.schema,
]
