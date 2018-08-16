const fetch = require('node-fetch');

getCourses = async (subject) => {
    try {
        const res = await fetch("http://bellevuecollege.edu/classes/All/" + subject.toUpperCase() + "/?format=json");
        const data = await res.json();
        return data.Courses;
    } catch(e) {
        console.log(e);
        return null;
    }
}

getCourse = async (subject, number) => {
    try {
        const res = await fetch("http://bellevuecollege.edu/classes/All/" + subject.toUpperCase() + "/" + number + "/?format=json");
        const data = await res.json();

        if(data.Courses.length < 1 || data.Courses == undefined) { // could this instead be another call to getCourse?
            const res = await fetch("http://bellevuecollege.edu/classes/All/" + subject.toUpperCase() + "%26/" + number + "/?format=json");
            return res.json();
        } else {
            return data;
        }
    } catch(e) {
        console.log(e);
        return null;
    }
}

getFootnotes = async(subject, number) => {
    const data = await getCourse(subject, number);
    if(data === null || data.Courses.length === 0) return null;
    return data.Courses[0].Footnotes;
}

exports.getPrerequisite = async (subject, number) => {
    const footnotes = await getFootnotes(subject, number);
    if(footnotes === null) return null;
    const prerequisites = footnotes.find((f) => {
        return f.includes("Prerequisite") || f.includes("prerequisite");
    })
    return (prerequisites ? prerequisites.split(':'):[]);
}


exports.getRecommended = async (subject, number) => {
    const footnotes = await getFootnotes(subject, number);
    if(footnotes === null) return null;
    const recommended = footnotes.find((f) => {
        return f.includes("Recommended") || f.includes("recommended");
    })

    return (recommended?recommended.split(':'):[]);
}

exports.getQuartersOffered = async(subject, number) => {
    const course = await getCourse(subject, number);
    if(course === null || course.QuartersOffered.length === 0) return null;
    return course.QuartersOffered.map((q) => {return q.FriendlyName});;
}