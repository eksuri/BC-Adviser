const schema = require('./_schema.json')
const event = require('./_event.json')
exports.schema = schema
exports.event = event

const classes = require('../../common/classes');

exports.ClassesOfferedIntent = function ClassesOfferedIntent() {
    const course = this.event.request.intent.slots.Subjects.value;
    const quarter = this.event.request.intent.slots.Quarters.value;

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

