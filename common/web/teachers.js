//Created by Marius Popescu - 7.mariuspopescu.10@gmail.com 
const https = require('./get');

exports.getTeachers = (CourseAbbrev, CourseNumber, quarter, year, callback) => {
    const classRegex = new RegExp ('<span class="courseID">'+ CourseAbbrev + ' ' + CourseNumber +'</span>([\\s\\S]*?)<span class="courseID">','g');
    https.getBCRegex("/classes/" + quarter+ year + "/"  + CourseAbbrev + "/", classRegex, (data) => {
        const teacherRegex = new RegExp ('<a href=\"https:.*\">(.*)<\/a>','g'); 
        // find the teachers name and push in the arry
        let array = [];
        while ((match = teacherRegex.exec(data[0]))) { 
            match.shift(); // shift out match[0], only groups left
            match.forEach((s) => {
                array.push(s);
            })
        }
        // Check and remove the duplicates
        for (var i = 0; i<array.length; i++){
            for (var j=i+1; j<array.length; j++) {
            if (array[i] === array[j])
            array.splice(i, 1);
            }
        } 

        //console.log(array); //just for testing
        callback(array);
    });
};