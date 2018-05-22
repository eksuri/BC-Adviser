const fetch = require('node-fetch');

getCourses = async (subject) => {
    const res = await fetch("http://bellevuecollege.edu/classes/All/" + subject.toUpperCase() + "/?format=json");
    const data = await res.json();
    return data.Courses;
}

getCourse = async (subject, number) => {
    const res = await fetch("http://bellevuecollege.edu/classes/All/" + subject.toUpperCase() + "/" + number + "/?format=json");
    const data = await res.json();

    return data;
}

getFootnotes = async(subject, number) => {
    const data = await getCourse(subject, number);
    return data.Courses[0].Footnotes;
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

exports.getQuartersOffered = async(subject, number) => {
    const course = await getCourse(subject, number);    
    return course.QuartersOffered.map((q) => {return q.FriendlyName});;
}