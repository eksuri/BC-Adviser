const schema = require('./_schema.json')
exports.schema = schema

const canvas = require('../../common/canvas');

exports.GetMyClasses = function () { 
    canvas.getClasses((courses) => {
        
        let speechOutput;

        if (courses != null && courses[0] != null) {
            speechOutput = "This quarter you're currently enrolled in";
            courses.forEach((course) => {
                speechOutput += " " + course;
            })
        } else {
            speechOutput = "I'm not sure.";
        }
        this.response.speak(speechOutput);
        this.emit(':responseReady');
    });
    
}

exports.GetMyGrades = function () { 
    canvas.getGrades((grades) => {
        let speechOutput;

        if (grades!= null && grades[0] != null) {
            speechOutput = "Your grade in" + grades[0] + " is " + grades[1];
        } else {
            speechOutput = "I'm not sure.";
        }
        this.response.speak(speechOutput);
        this.emit(':responseReady');
    });
}