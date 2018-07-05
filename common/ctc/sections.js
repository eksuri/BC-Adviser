const fetch = require('node-fetch');

getSections = async (quarter, subject) => {
    const res = await fetch("http://bellevuecollege.edu/classes/" + quarter.toUpperCase() + "/" + subject.toUpperCase() + "/?format=json");
    const text = await res.text();
    const data = JSON.parse(text.replace(`"ID":null,`,``)); // duplicate object key fix

    return data;
}


getCourseSections = async (quarter, subject, number) => {
    const sections = await getSections(quarter, subject);
    const courses = sections.Courses.filter((c) => {
        return c.Sections[0].CourseNumber === number
    });

    return courses[0].Sections;
}

exports.getCourseSection = async (quarter, subject, number, id) => {
    const sections = await getCourseSections(quarter, subject, number);

    const courses = sections.filter((s) => {
        return s.ID ? s.ID.ItemNumber === id : false; // more robust, try to do this more
    });

    return courses[0];
}

exports.getInstructors = async (quarter, number, subject) => {
    const sections = await getCourseSections(quarter, subject, number);
    
    const offerings = sections.map((s) => {
        return s.Offered[0].InstructorName;
    })
    
    return offerings;
}


exports.getCoursesOffered = async (quarter, subject) => {
    const sections = await getSections(quarter, subject);
    const courses = sections.Courses.map((c) => { return c.Sections[0].CourseTitle })

    return courses;
}


exports.getCourseSchedule = async (quarter, subject, number) => {
    const sections = await getCourseSections(quarter, subject, number);

    const offerings = sections.map((s) => {
        if (s.IsOnline) {
            return [{"Times":["Online", "00:00", "00:00"]}];
        } else {
            const times = s.Offered.map((o) => {
                const start = o.StartTime ? (2208960000000 + Number.parseInt(o.StartTime.split(/[\(\)]/)[1])) / 60000 : null;
                const end = o.EndTime ? (2208960000000 + Number.parseInt(o.EndTime.split(/[\(\)]/)[1])) / 60000 : null;

                const s = parseInt(start / 60 << 0).toString().padStart(2, "0") + ":" + parseInt(start % 60).toString().padStart(2, "0");
                const e = parseInt(end / 60 << 0).toString().padStart(2, "0") + ":" + parseInt(end % 60).toString().padStart(2, "0");

                return [o.Days, s, e];
            });
            return {"Times":times};
        }
    });

    return {"Sections":offerings}
}