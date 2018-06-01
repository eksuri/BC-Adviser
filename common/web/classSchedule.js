const https = require('./get');

exports.getClassSchedule = (CourseAbbrev, CourseNumber, quarter, year, callback) => {
    const classRegex = new RegExp ('<span class="courseID">'+ CourseAbbrev + ' ' + CourseNumber +'</span>([\\s\\S]*?)<span class="courseID">','g');
    https.getBCRegex("/classes/" + quarter+ year + "/"  + CourseAbbrev + "/", classRegex, (data) => {
        //console.log(data); //just for testing   
        const onlineRegex = new RegExp ('</td>[\\s\\S]*?<td>[\\s\\S]*?(On.*)[\\s\\S]*?</td>[\\s\\S]*?<td>','g'); 
        const scheduleRegex1 = new RegExp ('<abbr title=\"(.*)\">.*</abbr>, (.*) in','g'); 
        const scheduleRegex = new RegExp ('<abbr title=\"(.*)\">.*</abbr>, (.*) in [\\s\\S]*?(<!-- section .* -->)','g');
        // find the schedule and push it in the arry
        let array = [];
        while (match = scheduleRegex.exec(data[0])) { 
            match.shift(); // shift out match[0], only groups left
            match.forEach((s) => {
                array.push(s);
            })
        }
        // check for online classes
        while (match = onlineRegex.exec(data[0])) { 
            match.shift(); // shift out match[0], only groups left
            match.forEach((s) => {
                array.push(s);
            })
        }
        
        if (array.length < 2){
            while (match = scheduleRegex1.exec(data[0])) { 
                match.shift(); // shift out match[0], only groups left
                match.forEach((s) => {
                    array.push(s);
                })
            }
        }
        // replace the '/' with ', ', without replacing Alexa will say "slash"
        // and mark the end of the section with ";"
        for(var i = 0; i < array.length; i++)
        {
            array[i] = array[i].replace('/', ' ');
            array[i] = array[i].replace('<!-- section details -->', ' ; ');
        }

        //console.log(array); //just for testing
        callback(array);
    });
};