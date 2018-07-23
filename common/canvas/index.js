const fetch = require('node-fetch');
const config = require('../../config.json')

const api = "https://canvas.instructure.com/api"
const token = config.token;

getCanvasCourses = async() => {
    const res = await fetch("https://canvas.instructure.com/api/v1/courses?access_token=" + token + "&enrollment_state=active&include=total_scores");
    const data = await res.json();

    return data;
}

getCanvasCourseIds = async () => {
    const classes  = await getCanvasCourses();
    const ids = classes.map((c) => {return c.id});

    return ids;
}

getAssignments = async(id) => {

    const res = await fetch("https://canvas.instructure.com/api/v1/courses/" + id + "/assignments?access_token=" + token);
    const assignments = await res.json();

    const assignmentNames = assignments.map((c) => {return c.name});

    return assignmentNames;
}

getQuizzes = async(id) => {
    return "Test Quiz";

    //you need to 'fetch' the right api url, and pass along your id & token in the request
    //then you turn your 'res' into 'json' named data

    //const res = await fetch("https://canvas.instructure.com/api/????????????");
    //const data = await res.json();

    //data will be an array of quizzes

    //then return an array with only the quiz titles
    //you can use the map function to do it in one line if you want
    //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map

    //or do a more traditional for loop or for each and fill an array

    //return something;

}


exports.getAllAssignments = async () => {
    const ids = await getCanvasCourseIds();
    const AssignmentNames = ids.map(async (id) => getAssignments(id));
    return Promise.all(AssignmentNames).then((completed) => { return completed });
}



exports.getAllQuizzes = async () => {
    const ids = await getCanvasCourseIds();  
    const QuizNames = ids.map((id) => getQuizzes(id));
    
    return QuizNames;
}

exports.getCourseNames = async () => {
    const courses = await getCanvasCourses();
    const current_courses = courses.filter((course) => {return course.end_at != null});
    const course_names = current_courses.map((course) => {return course.name.substring(11)});
    return course_names;
}

exports.getCanvasGrades = async () => {
    const grades = await getCanvasCourses();
    const current_grades = grades.filter((g) => {return g.enrollments});
    const grades_strings = current_grades.map((g) => {return [g.name.substring(11), g.enrollments[0].computed_final_score]})
    return grades_strings;
}