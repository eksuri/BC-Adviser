const schema = require('./_schema.json') //get the _schema.json file
exports.schema = schema
//Declaring a constant message
const MESSAGE = "The minimum accepted grade for this program is two point zero";

exports.MinimumGradeIntent = function MinimumGradeIntent () {
    const speechOutput = MESSAGE
    console.log(speechOutput); // to debug 
    this.response.speak(speechOutput);
    this.emit(':responseReady');
}