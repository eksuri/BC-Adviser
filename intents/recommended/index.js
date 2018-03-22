const schema = require('./_schema.json')
const recommend = require('../../common/recommend');
exports.schema = schema

exports.GetRecommendedIntent = function GetRecommendedIntent () {
    const CourseAbbrev = this.event.request.intent.slots.CourseAbbrev.value;
    const CourseNumber = this.event.request.intent.slots.CourseNumber.value;
    
    recommend.getRecommended(CourseAbbrev, classNumber, "Recommended", (classes) => {
        let speechOutput
        if (classes != null)
        {
            speechOutput = "Before taking " + CourseAbbrev + " " + CourseNumber+ ", it is recommended that you should take " + classes;
        }
        else {
            speechOutput = "There are no recommended classes for you to take before " + CourseAbbrev + " " + classNumber;
        }
        this.response.speak(speechOutput);
        console.log(speechOutput)
        this.emit(':responseRead');
    });

}

exports.GetPrerequisiteIntent = function GetPrerequisiteIntent () {
    const CourseAbbrev = this.event.request.intent.slots.subject.value;
    const CourseNumber= this.event.request.intent.slots.subNumber.value;

    recommend.getRecommended(CourseAbbrev, classNumber, "Prerequisite", (classes) => {
        let speechOutput
        if (classes != null)
        {
            speechOutput = "Prerequisites for " + CourseAbbrev + " " + CourseNumber+ " include: " + classes;
        }
        else {
            speechOutput = "There are no prerequisites for you to take before " + CourseAbbrev + " " + classNumber;
        }
        this.response.speak(speechOutput);
        this.emit(':responseReady');
    });

}