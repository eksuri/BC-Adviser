const schema = require('./_schema.json')
exports.schema = schema

const classes = require('../../common/classes');

exports.ClassesOfferedIntent = function() {
    const subject = this.event.request.intent.slots.Subjects.value;
    const quarter = (this.event.request.intent.slots.Quarter.value == "autumn" ?
        "fall" : this.event.request.intent.slots.Quarter.value);
    const year = this.event.request.intent.slots.Year.value;


    classes.getOfferings(subject, quarter + year, (offering) => {
        let speechOutput = "For the " + quarter + year + " quarter at Bellevue College are offered following classes: "
        for (let i = 0; i = offering.length / 2; i++) {
            speechOutput += offering.pop() + " ";
            offering.pop();
        }
        this.response.speak(speechOutput.replace("&", "and"));
        this.emit(':responseReady');
    });

}

