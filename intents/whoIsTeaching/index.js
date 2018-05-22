//Created by Marius Popescu - 7.mariuspopescu.10@gmail.com 
const schema = require('./_schema.json')
exports.schema = schema

const teachers = require('../../common/teachers');

exports.WhoIsTeachingIntent = function () {
    //Extract the value of the slots
    const CourseAbbrev = this.event.request.intent.slots.CourseAbbrev.value;
    const CourseNumber = this.event.request.intent.slots.CourseNumber.value;
    const quarter = (this.event.request.intent.slots.Quarter.value == "autumn" ?
        "fall" : this.event.request.intent.slots.Quarter.value);
    const year = this.event.request.intent.slots.Year.value;

    teachers.getTeachers(CourseAbbrev, CourseNumber, quarter, year, (teachers) => {
        let speechOutput =" "
        //check if the user entered all the required variable
        if(CourseAbbrev != null && CourseNumber != null && quarter != null && year != null){ 
            speechOutput = "This class is thaught at Bellevue College by: "
            if (teachers != null && teachers[0] != null){ // Check if we found teachers teaching this class
                speechOutput = "This class is thaught at Bellevue College by: "
                    if(teachers.length == 1) // pop without commas
                    speechOutput += teachers.pop();
                    else { //pop with commas and "and"
                        for (let i = 0; i = teachers.length -1; i++) {
                            speechOutput += teachers.pop() + ", ";
                        }
                        speechOutput += "and " + teachers.pop();
                    }
            }
            else { // If not found informs and guides the user to ask about class offered
                speechOutput = "There are no information yet about who will teach this class, or you entered wrong variables. Please check what class are offred in " + quarter + " " + year + " for the desired subject; in order to find if this class is offered at Bellevue College"
            }
        }
        else {
            speechOutput = "You did not enter all the required variables. You should enter a course abreviation, a course number, a quarter, and a year."
        }
        this.response.speak(speechOutput); 
        this.emit(':responseReady');
        //console.log(speechOutput); //just for debuging 
        
    });
}