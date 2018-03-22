const schema = require('./_schema.json')
const events = require('./_events.json')
exports.schema = schema
exports.events = events

const finals = require('../../common/finals');

exports.GetFinalsInfoIntent = function GetFinalsInfoIntent() {
    const date = new Date();
    const month = date.getMonth();
    
    finals.getDates(month, (dates) => { // get array of finals dates
        const speechOutput = "Finals this quarter start on " + dates.shift() + " and last until " + dates.pop();
        this.response.speak(speechOutput);
        this.emit(':responseReady');
    });
}


