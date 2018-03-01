const finals = require('../../common/finals');

exports.GetFinalsInfoIntent = function GetFinalsInfoIntent() {
    const date = new Date();
    const month = date.getMonth();
    
    finals.getDates(month, (dates) => { // get array of finals dates
        const speechOutput = "Finals this quarter start on " + dates.shift() + " and last until " + dates.pop();
        //console.log(speechOutput);
        this.response.speak(speechOutput);
        this.emit(':responseReady');
    });
}