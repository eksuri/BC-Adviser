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

exports.getCoursesOffered = async(subject, quarter) => {
    const courses = await getCourses(subject); // get all the courses in the subject
    const numbers = await Promise.all(courses.map(async (c) => {return c.Number;})); // then get all 
    
    const course_offerings = await numbers.map(async (n) => {
        const course = await getCourse(subject, n);
        return course;
    })

    let course_titles = await Promise.all(course_offerings).then((c)=> {
        const course_filter = c.filter((m) => {
            const b = m.QuartersOffered.filter(n => (n.FriendlyName === "Fall 2018"));
            return b.length != 0;
        });

        return course_filter.map((f) => {return f.Courses[0].Title}); // should be another filter or map   
    });

    return course_titles;
}
