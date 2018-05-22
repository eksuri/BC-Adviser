//Created by Marius Popescu - 7.mariuspopescu.10@gmail.com 
const classes = require('../../common/classSchedule');
const schema = require('./_schema.json')
exports.schema = schema

const classSchedule = require('../../common/classSchedule');

exports.TimeConflictIntent = function () {
    //Extract the value of the slots
    const CourseAbbrevOne = this.event.request.intent.slots.CourseAbbrevOne.value;
    const CourseNumberOne = this.event.request.intent.slots.CourseNumberOne.value;
    const CourseAbbrevTwo = this.event.request.intent.slots.CourseAbbrevTwo.value;
    const CourseNumberTwo = this.event.request.intent.slots.CourseNumberTwo.value;
    const quarter = (this.event.request.intent.slots.Quarter.value == "autumn" ?
        "fall" : this.event.request.intent.slots.Quarter.value);
    const year = this.event.request.intent.slots.Year.value;

    classes.getClassSchedule(CourseAbbrevOne, CourseNumberOne, quarter, year, (classSchedule1) => {
        classes.getClassSchedule(CourseAbbrevTwo, CourseNumberTwo, quarter, year, (classSchedule2) => {
            
            let class1 = " ";
            for (let i = 0; i = classSchedule1.length; i++) {  
                class1 += classSchedule1.shift() + " ";
            }

            let class2 = " ";
            for (let i = 0; i = classSchedule2.length; i++) {  
                class2 += classSchedule2.shift() + " ";
            }
            //declaring variable
            var conf = new Boolean (true);
            let speechOutput = " ";
            //check if it's conflict
            //loop between the section of both classes and check for conflict exit if found no conflict
            Loop:
            for (x = 0; x < class1.split(";").length; x++){
                for (y = 0; y < class2.split(";").length; y++){
                   //console.log("*** X is "+x+"***for "+class1.split(";")[x]+"***  Y is "+ y +"***for "+class2.split(";")[y]);
                   conf = scheduleConflict(class1.split(";")[x], class2.split(";")[y]);
                   if (conf === false) break Loop;
                }
                if (conf === false) break Loop;
            }

            if(conf === true)
                speechOutput = "You can not take " + CourseAbbrevOne + CourseNumberOne+" and " + CourseAbbrevTwo + CourseNumberTwo+ " in the " + quarter+ " " +year+" because the class schedule is overlapping, you should choose one of them!";
            else 
                speechOutput = "Of course, you can take " + CourseAbbrevOne + CourseNumberOne+" and " + CourseAbbrevTwo + CourseNumberTwo + " in the " + quarter+ " " +year+ ", there is no overlapping";

            this.response.speak(speechOutput);
            this.emit(':responseReady');
             
            /************  //Debugging code  
            console.log(class1); //just for debuging 
            console.log(class2); //just for debuging
            console.log(conf);
            console.log(speechOutput); //just for debuging  /*********/
        });
    });
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
            if((scheduleX[d][0]<scheduleY[d][0])&&(scheduleY[d][1]<scheduleX[d][1]))
                conflict = true;
            if((scheduleX[d][0]>scheduleY[d][0])&&(scheduleY[d][1]>scheduleX[d][1]))
                conflict = true;
        }
       
        /************   //Debugging code
        for (d = 0; d < 5; d++){ //print the array for debugging
            console.log(scheduleX[d])
        }
        console.log(" ");
        for (d = 0; d < 5; d++){ //print the array for debugging
            console.log(scheduleY[d])
        }
        console.log(" "); /*********/

        return conflict;
      }

      //this method will check the days when the class is offered and will call getDailySchedule method for each day found
       function checkDays(x, schedule){
        if (x.indexOf("monday") != -1)
            getDailySchedule(x, 0,"monday", schedule);
        if (x.indexOf("tuesday") != -1)
            getDailySchedule(x, 1,"tuesday", schedule);
        if (x.indexOf("wednesday") != -1)
            getDailySchedule(x, 2,"wednesday", schedule);
        if (x.indexOf("thursday") != -1)
            getDailySchedule(x, 3,"thursday", schedule);
        if (x.indexOf("friday") != -1)
            getDailySchedule(x, 4,"friday", schedule);
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
            s2 = s.slice(s.indexOf(day));     //cut the "Day Name" for the string, create s2 to send forward to the method
            s3 = s2.slice(s2.indexOf("y"), s2.indexOf("-"));     //cut the string in order to find the starting time
            s4 = s2.slice(s2.indexOf("-"), s2.indexOf("m "));     //cut the string in order to find the ending time
            schedule[i][0]= s3.replace( /[^\d.]/g, '' );  //get just the numbers
            if(s3.indexOf("pm") != -1){     // if pm add 12 hours
                schedule[i][0] = parseInt(schedule[i][0]) + 1200;
                if(schedule[i][0] >= 2400)  // manage the 12 pm case
                    schedule[i][0] -= 1200;
            }
            schedule[i][1]= s4.replace( /[^\d.]/g, '' );  //get just the numbers
            if(s4.indexOf("p") != -1){      // if pm add 12 hours
                schedule[i][1] = parseInt(schedule[i][1]) + 1200;
                if(schedule[i][1] >= 2400)    // manage the 12 pm case
                    schedule[i][1] -= 1200;
            }
       }
};