const schema = require('./_schema.json')
const recommend = require('../../common/recommend');
exports.schema = schema

const EXAMPLE_MESSAGE = "Hello World";

exports.GetRecommendedIntent = function GetRecommendedIntent () {
    const fieldOfStudy = this.event.request.intent.slots.subject.value;
    const classNumber = this.event.request.intent.slots.classNumber.value;
    
    recommend.getRecommended(fieldOfStudy, classNumber, (classes) => {
        if (classes != "")
        {
            const speechOutput = "Before taking " + fieldOfStudy + " " + classNumber + ", it is recommended that you should take " + classes;
            this.response.speak(speechOutput);
            this.emit(':responseReady');
        }
        else {
            const speechOutput = "There are no recommended classes for you take before " + fieldOfStudy + " " + classNumber;
            this.response.speak(speechOutput);
            this.emit(':responseRead');
        }
    });

}