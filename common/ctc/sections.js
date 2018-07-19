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

exports.CompareCourseSchedule = async (subjectOne, numberOne, subjectTwo, numberTwo, quarter, year) => {

    const scheduleOne = await this.getCourseSchedule(quarter + year, subjectOne, numberOne);
    const scheduleTwo = await this.getCourseSchedule(quarter + year, subjectTwo, numberTwo);
    // create string schedule 
    let stringX = "";
    scheduleOne.Sections.forEach((s) => {
        stringX += s.Times + " ; ";
    }) 
    let stringY = "";
    scheduleTwo.Sections.forEach((s) => {
        stringY += s.Times + " ; ";
    }) 
    
    var conf = new Boolean (true);
    //check if it's conflict
    //loop between the section of both classes and check for conflict exit if found no conflict
    Loop:
    for (x = 0; x < stringX.split(";").length - 1; x++){
        for (y = 0; y < stringY.split(";").length - 1; y++){
            conf = scheduleConflict(stringX.split(";")[x], stringY.split(";")[y]);
            if (conf == false) {
                break Loop;
            }
        }
        if (conf == false) break Loop;
    }
    //this method will get two stings as parameters. The strings are the schedule for the classes parsed from BC websit, 
    //then will create two arrays representing the schedule for each class and will input the sacedule in the arrays as integers 
    //representig start hour and end hour for each class in each day.
    function scheduleConflict(x, y) {
    // convert the arrays to lower case 
    x = x.toLowerCase();
    y = y.toLowerCase();
    // create the schedule arrays
    let scheduleX = [];
    for (d = 0; d < 5; d++){
    scheduleX[d] = [];
    for (h = 0; h < 2; h++) {
        scheduleX[d][h] = 0;
    }
    }
    let scheduleY = [];
    for (d = 0; d < 5; d++){
    scheduleY[d] = [];
    for (h = 0; h < 2; h++) {
        scheduleY[d][h] = 0;
    }
    }
    //call the methods in order to get the data iside the schedule arrays
    checkDays(x, scheduleX);
    checkDays(y, scheduleY);
    //compare the schedule array in order to find if is time conflict
    var conflict = new Boolean (false);

    for (d=0; d<5; d++){
    if((scheduleX[d][0]<scheduleY[d][0])&&(scheduleY[d][0]<scheduleX[d][1])) 
        conflict = true;
    if((scheduleX[d][0]<scheduleY[d][1])&&(scheduleY[d][1]<scheduleX[d][1])) 
        conflict = true;
    if((scheduleY[d][0]<scheduleX[d][1])&&(scheduleX[d][1]<scheduleY[d][1]))  
        conflict = true;
    if((scheduleY[d][0]<scheduleX[d][0])&&(scheduleX[d][0]<scheduleY[d][1]))  
        conflict = true;
    }
        return conflict;
        }
    //this method will check the days when the class is offered and will call getDailySchedule method for each day found
    function checkDays(x, schedule){
    if (x.indexOf("m") != -1)
    getDailySchedule(x, 0,"m", schedule);
    if (x.indexOf("t") != -1)
    getDailySchedule(x, 1,"t", schedule);
    if (x.indexOf("w") != -1)
    getDailySchedule(x, 2,"w", schedule);
    if (x.indexOf("th") != -1)
    getDailySchedule(x, 3,"th", schedule);
    if (x.indexOf("f") != -1)
    getDailySchedule(x, 4,"f", schedule);
    if (x.indexOf("daily") != -1){
    getDailySchedule(x, 0, "daily", schedule);
    getDailySchedule(x, 1, "daily", schedule);
    getDailySchedule(x, 2, "daily", schedule);
    getDailySchedule(x, 3, "daily", schedule);
    getDailySchedule(x, 4, "daily", schedule);
    }
    }
    //This method will find the schedule, will convert from string to int and will populate the array for each day 
    function getDailySchedule(s, i, day, schedule){
    s2 = s.slice(s.indexOf(day)+1);     //cut the "Day Name" for the string, create s2 to send forward to the method
    s3 = s2.slice(s2.indexOf(","), s2.indexOf("0,")+1);     //cut the string in order to find the starting time
    s4 = s2.slice(s2.indexOf("0,")+1, s2.indexOf(",f"));     //cut the string in order to find the ending time
    schedule[i][0]= s3.replace( /[^\d.]/g, '' );  //get just the numbers
    schedule[i][1]= s4.replace( /[^\d.]/g, '' );  //get just the numbers
    }
return conf;
};
