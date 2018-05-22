const fetch = require('node-fetch');

getSections = async (quarter, subject) => {
    const res = await fetch("http://bellevuecollege.edu/classes/" + quarter.toUpperCase() + "/" + subject.toUpperCase() + "/?format=json");
    const data = await res.json();

    return data;
}

exports.getCoursesOffered = async (quarter, subject) => {
    const sections = await getSections(quarter, subject);
    const courses = sections.Courses.map((c) => { return c.Sections[0].CourseTitle})

    return courses;
}
