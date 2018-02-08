const finals = require('./finals');

exports.GetFinalsInfoIntent = function GetFinalsInfoIntent() {
    finals.getDates((dates) => { // get array of finals dates
        const speechOutput = "Finals this quarter start on " + dates.shift() + " and last until " + dates.pop();
        this.response.speak(speechOutput);
        this.emit(':responseReady');
    });
}