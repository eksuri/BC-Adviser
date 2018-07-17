const schema = require('./_schema.json')
exports.schema = schema

const ratings = require('../../common/web/ratings');


exports.GetProfessorRatingIntent = async function () {
    const FirstName = this.event.request.intent.slots.FirstName.value;
    const LastName = this.event.request.intent.slots.LastName.value;
    let speechOutput;

    if (FirstName == "" || FirstName == null || LastName == "" || LastName == null) {
        speechOutput = "You need to provide a full name.";
        this.response.speak(speechOutput);
        this.emit(':responseReady');
    }
    else {

        let rating = await ratings.getRating(FirstName, LastName)

        if (rating == null) {
            speechOutput = "We couldn't find that professor's rating.";
            this.response.speak(speechOutput);
            this.emit(':responseReady');
        }
        else {
            speechOutput = "On a scale of 0 to 5, Professor " + FirstName + " " + LastName + " has an overall rating of " + rating[0] + ", and a level of difficulty of " + rating[2] + ".";
            speechOutput = speechOutput + " " + rating[1] + " of students would take Professor " + LastName + " again.";

            this.response.speak(speechOutput);
            this.emit(':responseReady');
        }
    }
}

