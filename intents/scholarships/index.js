const Speech = require('ssml-builder');
const schema = require('./_schema.json')
exports.schema = schema

const scholarships = require('../../common/web/scholarships');

exports.Handler = [{
    canHandle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        return request.type === 'IntentRequest'
            && ["ScholarshipIntent"].includes(request.intent.name)
            && ["STARTED", "IN_PROGRESS", "COMPLETED"].includes(request.dialogState);
    },
    async handle(handlerInput) {
        let speech = new Speech();
        const list = await scholarships.getScholarships();
        
        if (scholarships.length < 3) { // base case, is empty
            names.say("Sorry, something went wrong.")
        } else { // general case, more than one.
            speech.say("The Bellevue College Foundation currently has")
                  .say(list.length)
                  .say("scholarships, including")
            
            let unique_scholarships = new Set([]);
            
            while (unique_scholarshipss.size < 3) {
                let index = Math.floor(Math.random() * list.length);
                unique_scholarships.add(list[index]);
            }

            let random_scholarships = Array.from(unique_scholarships);

            speech.say(random_scholarships[0])
                  .pause("1s")
                  .say(random_scholarships[1])
                  .pause("1s")
                  .say("and")
                  .say(random_scholarships[2]);

        }            
       return handlerInput.responseBuilder.speak(speech.ssml(true))
            .getResponse();

    }   
}]

