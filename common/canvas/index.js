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
    const current_assignments = assignments.filter((a) => a.due_at == null || a.due_at > Date.now());
    const assignment_names = current_assignments.map((c) => {return c.name});
  
    return assignment_names;
}


getQuizzes = async(id) => {
    const res = await fetch("https://canvas.instructure.com/api/v1/courses/" + id + "/quizzes/?access_token=" + token);
    const data = await res.json();
    
  if(Array.isArray(data)) {
        return data.map((c) => {return c.title}); 
    } else {
        return [];
    }
}

exports.getAllAssignments = async () => {
    const ids = await getCanvasCourseIds();
    const AssignmentNames = ids.map(async (id) => getAssignments(id));
    return Promise.all(AssignmentNames).then((completed) => { return completed });
}

exports.getAllQuizzes = async () => {
    const ids = await getCanvasCourseIds();  
    const QuizNames = ids.map(async (id) => getQuizzes(id));
    return Promise.all(QuizNames).then((completed) => { return completed});
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