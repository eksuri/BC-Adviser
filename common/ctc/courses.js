const fetch = require('node-fetch');
const config = require('../../config.json')

getCourses = async (subject) => {
    const res = await fetch("http://bellevuecollege.edu/classes/All/" + subject.toUpperCase() + "/?format=json");
    const data = await res.json();
    return data.Courses;
}

getCourse = async (subject, number) => {
    const courses = await getCourses(subject);
    console.log(number)
    const course = courses.find((c) => {
        return (
            (Number.parseInt(c.Number) === Number.parseInt(number)) &&
            (c.Subject = subject.toUpperCase)
        )
    });

    return course;
}

getFootnotes = async(subject, number) => {
    const course = await getCourse(subject, number);
    return course.Footnotes;
}


exports.getPrerequisite = async (subject, number) => {
    const footnotes = await getFootnotes(subject, number);
    const prerequisites = footnotes.find((f) => {
        return f.startsWith("Prerequisite");
    })

    return (prerequisites ? prerequisites.split(':')[1]:null);
}


exports.getRecommended = async () => {
    const footnotes = await getFootnotes(subject, number);
    const recommended = footnotes.find((f) => {
        return f.startsWith("Recomended");
    })

    return (recommended?recommended.split(':')[1]:null);
}