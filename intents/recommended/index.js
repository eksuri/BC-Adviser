const schema = require('./_schema.json')
const recommend = require('../../common/recommend');
exports.schema = schema

const EXAMPLE_MESSAGE = "Hello World";

exports.GetRecommendedIntent = function GetRecommendedIntent () {
    const fieldOfStudy = this.event.request.intent.slots.subject.value;
    const classNumber = this.event.request.intent.slots.subNumber.value;
    
    recommend.getRecommended(fieldOfStudy, classNumber, "Recommended", (classes) => {
        let speechOutput
        if (classes != "")
        {
            speechOutput = "Before taking " + fieldOfStudy + " " + classNumber + ", it is recommended that you should take " + classes;
        }
        else {
            speechOutput = "There are no recommended classes for you to take before " + fieldOfStudy + " " + classNumber;
        }
        this.response.speak(speechOutput);
        console.log(speechOutput)
        this.emit(':responseRead');
    });

}