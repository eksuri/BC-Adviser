const Speech = require('ssml-builder');
const schema = require('./_schema.json')
exports.schema = schema

const money = require('../../common/web/money');


exports.GetScholarshipIntent = async function () {
    let speech = new Speech();

    let scholarships = await money.getScholarships();

    if (scholarships.length == 0) { // base case, is empty
        speech.say("There are no scholarships at this time.")
    } else if (scholarships.length == 1) { // second base case, only one
        speech.say("Our avaliable scholarship is")
            .say(scholarships[0]);
    } else { // general case, more than one.
        let last = scholarships.pop();

        speech.say("Avaliable scholarships include")

        scholarships.forEach((s) => {
            speech.say(s)
                .pause("1s")
        })
        speech.say(last);
    }

    this.emit(':tell', speech.ssml(true));

}

