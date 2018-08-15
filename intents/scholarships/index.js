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
            
            let random_scholarships = new Set([]);
            
            while (random_scholarships.size < 3) {
                let index = Math.floor(Math.random() * list.length);
                random_scholarships.add(list[index]);
            }

            random_scholarships.forEach((s)=> speech.say(s).pause("1s"));
        }            
       return handlerInput.responseBuilder.speak(speech.ssml(true))
            .getResponse();

    }   
}]

