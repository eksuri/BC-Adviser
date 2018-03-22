const schema = require('./_schema.json')
const events = require('./_events.json')
exports.schema = schema
exports.events = events

const classes = require('../../common/classes');

exports.ClassesOfferedIntent = function ClassesOfferedIntent() {
    const course = this.event.request.intent.slots.Subjects.value;
    const quarter = this.event.request.intent.slots.Quarters.value;

    // alexa will never parse "Winter2018". Fix this schema.

    classes.getOfferings(course, quarter, (offering) => {
        let speechOutput = "For the " + quarter + " quarter at Bellevue College are offered following classes: "
        for (let i = 0; i = offering.length / 2; i++) {
            speechOutput += offering.pop() + " ";
            offering.pop();
        }
        this.response.speak(speechOutput);
        this.emit(':responseReady');
    });
}

