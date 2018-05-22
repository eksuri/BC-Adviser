const Speech = require('ssml-builder');
const schema = require('./_schema.json')
exports.schema = schema

const degrees = require('../../common/web/degrees.js');

exports.GetBellevueDegreesIntent = async function () {
    let speech = new Speech();

    const degree_type = this.event.request.intent.slots.program.value;

    if (degrees.list.includes(degree_type)) {
        const list_of_degrees = await degrees.getDegrees(degree_type);
        
        speech.say(degree_type)
              .say("degrees include");

        list_of_degrees.forEach((d) => {
            speech.say(d)
                  .pause("1s");
        });
    } else {
        speech.say("That is not avaliable at this time");
    }

    this.emit(':tell', speech.ssml(true));
}