const schema = require('./_schema.json')
const events = require('./_events.json')
exports.schema = schema
exports.events = events

const bachelors = require("./bachelor");
const eastern = require("./eastern");
const transfer = require("./transfer");
const professional = require("./professional");
const nontransfer = require("./nontransfer");


exports.GetBellevueDegreesIntent = function GetBellevueDegreesIntent() {
    const programOfStudy = this.event.request.intent.slots.program.value;

    let response
    let degrees


    listDegrees = (response, degrees) => {
        degrees.getDegrees((array) => {
            var last = array.pop();
            array.forEach((s) => {
                response += s;
                response += ', ';
            })
            response += 'and ' + last;
            // console.log(response);
            this.response.speak(response);
            this.emit(':responseReady');
        })
    }

    switch (programOfStudy) { // this can be a shorter if-else block
        case "bachelors degrees":
            degrees = bachelors
            response = "Bachelor's Degrees that you can major in are: ";
            listDegrees(response, degrees)
            break;
        case "eastern Washington":
            degrees = eastern
            response = "Bachelor's degrees offered in conjunction with eastern washington university include: ";
            listDegrees(response, degrees)
            break;
        case "transfer associate degrees":
            degrees = transfer
            response = "Transfer Associate Degrees include: ";
            listDegrees(response, degrees)
            break;
        case "professional and technical degrees":
            degrees = professional
            response = "Professional and technical degrees include: ";
            listDegrees(response, degrees)
            break;
        case "non transfer degrees":
            degrees = nontransfer
            response = "Non transfer degrees include: ";
            listDegrees(response, degrees)
            break;
        default:
            response = "You said " + programOfStudy + ".  That is not available at this time.";
            this.response.speak(response);
            break;
    };

}
