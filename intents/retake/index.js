const schema = require('./_schema.json')
exports.schema = schema

const quarters = require('../../common/quarters');

exports.RetakeClassIntent = function () {
    //Extract the value of the slots
    //const course = this.event.request.intent.slots.CourseAbbrev.value;

    const CourseAbbrev = this.event.request.intent.slots.CourseAbbrev.value;
    const CourseNumber = this.event.request.intent.slots.CourseNumber.value;

    quarters.getQuarters(CourseAbbrev, CourseNumber, (quarts) => {
        let speechOutput = "This class is offered at Bellevue College "
        for (let i = 0; i = quarts.length / 2; i++) {
            speechOutput += quarts.pop() + " ";
            quarts.pop();
        }
        this.response.speak(speechOutput);
        this.emit(':responseReady');
    });
}