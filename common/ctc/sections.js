const fetch = require('node-fetch');

getSections = async (quarter, subject) => {
    const res = await fetch("http://bellevuecollege.edu/classes/" + quarter.toUpperCase() + "/" + subject.toUpperCase() + "/?format=json");
    const text = await res.text();
    const data = JSON.parse(text.replace(`"ID":null,`, ``)); // duplicate object key fix

    return data;
}


exports.getCourseSections = async (quarter, subject, number) => {
    const sections = await getSections(quarter, subject);
    const courses = await sections.Courses.filter((c) => {
        return c.Sections[0].CourseNumber === number
    });

    return courses[0].Sections;
}

exports.getInstructors = async (quarter, subject, number) => {
    const sections = await this.getCourseSections(quarter, subject, number);

    const offerings = sections.map((s) => {
        return s.Offered[0].InstructorName;
    })

    const instructors = new Set();
    offerings.forEach((o) => instructors.add(o));

    return Array.from(instructors);
}


exports.getCoursesOffered = async (quarter, subject) => {
    const sections = await getSections(quarter, subject);
    const courses = sections.Courses.map((c) => { return c.Sections[0].CourseTitle })

    return courses;
}


exports.getCourseSchedule = async (quarter, subject, number) => {
    const sections = await this.getCourseSections(quarter, subject, number);

    const offerings = sections.map((s) => {
        if (s.IsOnline) {
            return { "Times": ["Online", "00:00", "00:00"] };
        } else {
            const times = s.Offered.map((o) => {
                const start = o.StartTime ? (2208960000000 + Number.parseInt(o.StartTime.split(/[\(\)]/)[1])) / 60000 : null;
                const end = o.EndTime ? (2208960000000 + Number.parseInt(o.EndTime.split(/[\(\)]/)[1])) / 60000 : null;

                const s = parseInt(start / 60 << 0).toString().padStart(2, "0") + ":" + parseInt(start % 60).toString().padStart(2, "0");
                const e = parseInt(end / 60 << 0).toString().padStart(2, "0") + ":" + parseInt(end % 60).toString().padStart(2, "0");

                return [o.Days, s, e];
            });
            return { "Times": times };
        }
    });

    return { "Sections": offerings }
}

exports.getCourseSchedule = async (quarter, subject, number) => {
    const sections = await this.getCourseSections(quarter, subject, number);

    const offerings = sections.map((s) => {
        if (s.IsOnline) {
            return { "Times": [{ Days: ["Online"],Start: {},End: {}}] };
        } else {
            const times = s.Offered.map((o) => {
                const start = o.StartTime ? (2208960000000 + Number.parseInt(o.StartTime.split(/[\(\)]/)[1])) / 60000 : null;
                const end = o.EndTime ? (2208960000000 + Number.parseInt(o.EndTime.split(/[\(\)]/)[1])) / 60000 : null;

                const start_hour = parseInt(start / 60 << 0);
                const start_min = parseInt(start % 60);
                const end_hour = parseInt(end / 60 << 0);
                const end_min = parseInt(end % 60);

                let t_bool = true;
                let days = [];

                for (i = 0; i < o.Days.length; i++) {
                    switch (o.Days.charAt(i)) {
                        case 'M':
                            t_bool = false;
                            days.push("Monday");
                            break;
                        case 'W':
                            t_bool = false;
                            days.push("Wednesday");
                            break;
                        case 'F':
                            t_bool = false;
                            days.push("Friday");
                            break;
                        case 'T':
                            t_bool = true;
                            days.push("Tuesday");
                            break;
                        case 'h':
                            if (t_bool) {
                                days.pop();
                            }
                            t_bool = false;
                            days.push("Thursday");
                            break;
                    } 
                }

                return {"Days": days, "Start": {"Hour": start_hour, "Minute": start_min}, "End": {"Hour": end_hour, "Minute": end_min}};
            });
            return { "Times": times };
        }
    });

    return { "Sections": offerings }
}

exports.CompareCourseSchedule = async (s1, s2) => {
    const [scheduleOne, scheduleTwo] = await Promise.all([this.getCourseSchedule(s1.fullQuarter, s1.subject, s1.number), 
                                                          this.getCourseSchedule(s2.fullQuarter, s2.subject, s2.number)]);

    function conflict(time_one, time_two) {
        if (time_one.Days.includes("Online") || time_one.Days.includes("Online") ) {
            console.log("online");
            return false;
        }

        if (time_one.Days.some((day) => time_two.Days.includes(day))){
            const start_one = time_one.Start.Hour + (time_one.Start.Minute / 60);
            const start_two = time_two.Start.Hour + (time_two.Start.Minute / 60);
            const end_one = time_one.End.Hour + (time_one.End.Minute / 60);
            const end_two = time_one.End.Hour + (time_one.End.Minute / 60);

            return start_one <= end_two && start_two <= end_one;
        } else {
            return false;
        }

    }

    const no_conflict = scheduleOne.Sections.some((s1) => {
              return scheduleTwo.Sections.some((s2) => {
                  return s1.Times.every((t1) => {
                  return s2.Times.every((t2) => {
                    return !conflict(t1, t2);
                  })})
              })});


    return no_conflict;
};