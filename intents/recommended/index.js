const schema = require('./_schema.json')
exports.schema = schema

const recommend = require('../../common/recommend');

exports.GetRecommendedIntent = function () {
    const CourseAbbrev = this.event.request.intent.slots.CourseAbbrev.value;
    const CourseNumber = this.event.request.intent.slots.CourseNumber.value;
    
    recommend.getRecommended(CourseAbbrev, CourseNumber, (classes) => {
        let speechOutput
        if (classes != null && classes[0] != null)
        {
            speechOutput = "Before taking " + CourseAbbrev + " " + CourseNumber + " it is recommended that you should take " + classes[0];
        }
        else {
            speechOutput = "There are no recommended classes for you to take before " + CourseAbbrev + " " + CourseNumber;
        }
        this.response.speak(speechOutput);
        this.emit(':responseReady');
    });

}

exports.GetPrerequisiteIntent = function () {
    const CourseAbbrev = this.event.request.intent.slots.CourseAbbrev.value;
    const CourseNumber = this.event.request.intent.slots.CourseNumber.value;

    recommend.getPrerequisite(CourseAbbrev, CourseNumber, (classes) => {
        let speechOutput
        if (classes != null && classes[0] != null)
        {
            speechOutput = "Prerequisites for " + CourseAbbrev + " " + CourseNumber + " include: " + classes;
        }
        else {
            speechOutput = "There are no prerequisites for you to take before " + CourseAbbrev + " " + CourseNumber;
        }
        this.response.speak(speechOutput);
        this.emit(':responseReady');
    });

}