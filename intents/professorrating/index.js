const schema = require('./_schema.json')
exports.schema = schema

const ratings = require('../../common/ratings');


exports.GetProfessorRatingIntent = function () {
    const FirstName= this.event.request.intent.slots.FirstName.value;
    const LastName= this.event.request.intent.slots.LastName.value;
    let speechOutput;

    if (FirstName == "" || FirstName == null || LastName == "" || LastName == null)
    {
        speechOutput = "You need to provide a full name.";
        this.response.speak(speechOutput);
        this.emit(':responseReady');
    }
    else 
    {
        
        ratings.getRating(FirstName, LastName, (rating) => {
            if (rating == null)
            {
                speechOutput = "We couldn't find that professor's rating.";
                this.response.speak(speechOutput);
                this.emit(':responseReady');
            }
            else
            {
                speechOutput = "On a scale of 0 to 5, Professor " + FirstName + " " + LastName + " has an overall rating of " + rating[0] + ", and a level of difficulty of " + rating[2] + ".";
                speechOutput = speechOutput + " " + rating[1] + " percent of students would take Professor " + LastName + " again.";

                if (rating[3].includes("hot")) 
                {
                    speechOutput = speechOutput + " Oh, and Professor " + LastName + " is HOT!";
                }
                console.log(speechOutput);
                this.response.speak(speechOutput);
                this.emit(':responseReady');
            }
        });
    }
}

