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
    //const ids = classes.map((c) => {return c.ID});
    const ids = classes.map((c) => {return c.id});

    return ids;
}

getAssignments = async(id) => {
    return "Test Assignment";

    //you need to 'fetch' the right api url, and pass along your id & token in the request
    //then you turn your 'res' into 'json' named data

    //const res = await fetch("https://canvas.instructure.com/api/????????????");
    //const data = await res.json();

    //data will be an array of assignments

    //then return an array with only the assignment names
    //you can use the map function to do it in one line if you want
    //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map

    //or do a more traditional for loop or for each and fill an array

    //return something;
    //course_3461B891
    // "https://canvas.instructure.com/api/v1/announcements?access_token=" + token + "&context_codes[]=course_3477B673"
    // https://canvas.instructure.com/api/v1/courses/90000001630712/quizzes/?access_token=9~Dk5XtraDbuH48yosqh9J5srFnM3RotJYcb4vHZAJIvRgs15tC6f0maFoYF995VqC&context_codes[]=course_3477B673
    // const res = await fetch("https://canvas.instructure.com/api/v1/courses/90000001630712/quizzes/?access_token=" + token +"&context_codes[]=course_3477B673");
}

getQuizzes = async(id) => {
    //'fetch' the right api url, and pass along with the id & token in the request
    const res = await fetch("https://canvas.instructure.com/api/v1/courses/" + id + "/quizzes/?access_token=" + token);
    //turn 'res' into 'json' named data
    const data = await res.json();  //data is an array of quizzes
    if(Array.isArray(data)) {
        //return an array with only the quiz titles
        array = data.map((c) => {return c.title}); 
    } else {
        array = []
    }
    return array;
}

exports.getAllAssignments = async () => {
    const ids = await getCanvasCourseIds();
    const AssignmentNames = ids.map((id) => getAssignments(id));
    
    return AssignmentNames;
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