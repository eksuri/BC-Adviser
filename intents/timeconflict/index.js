const Speech = require('ssml-builder');
const schema = require('./_schema.json')
exports.schema = schema

const sections = require('../../common/ctc/sections');

exports.Handler = {
    canHandle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        return request.type === 'IntentRequest'
            && request.intent.name === 'TimeConflictIntent';
    },
    async handle(handlerInput) {
        let speech = new Speech();

        const responseBuilder = handlerInput.responseBuilder;
        const slots = handlerInput.requestEnvelope.request.intent.slots;

        //Extract the value of the slots
        const subjectOne = slots.subjectOne.value;
        const numberOne = slots.numberOne.value;
        const subjectTwo = slots.subjectTwo.value;
        const numberTwo = slots.numberTwo.value;
        const quarter = (slots.quarter.value == "autumn" ? "fall" : slots.quarter.value);
        const year = slots.year.value;

        // format: {Sections: [Times: [MW, 10:30, 12:30], [F, 11:30, 1:30]]}
        const scheduleOne = await sections.getCourseSchedule(quarter + year, subjectOne, numberOne);
        const scheduleTwo = await sections.getCourseSchedule(quarter + year, subjectTwo, numberTwo);

        // update times object before fully implementing

        // boolean
        let no_conflict = scheduleOne.Sections.some((s1) => {
            // boolean
            return c = scheduleTwo.Sections.some((s2) => {
                return (true);
            })
        })

        speech.say("You")
            .say(no_conflict ? "can" : "cannot")
            .say("take both")
            .say(subjectOne)
            .say(numberOne)
            .say("and")
            .say(subjectTwo)
            .say(numberTwo)
            .say(quarter)
            .say(year)

        return responseBuilder.speak(speech.ssml(true))
            .getResponse();
    }
}
