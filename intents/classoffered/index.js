const classes = require('../../common/classes');
const schema = require('./_schema.json')
exports.schema = schema

exports.ClassesOfferedIntent = function ClassesOfferedIntent() {
    //Extract the value of the slots
    const course = this.event.request.intent.slots.Subjects.value;
    const quarter = this.event.request.intent.slots.Quarters.value;

    classes.getOfferings(course, quarter, (clas) => {
        let speechOutput = "For the " + quarter + " quarter at Bellevue College are offered following classes: "
        for (let i = 0; i = clas.length / 2; i++) {
            speechOutput += clas.pop() + " ";
            clas.pop();
        }
        console.log(speechOutput);
        //this.response.speak(speechOutput);
        this.emit(':responseReady');
    });
}

