const Speech = require('ssml-builder');
const schema = require('./_schema.json')
exports.schema = schema

const finals = require('../../common/web/finals.js');

exports.GetFinalsInfoIntent = async function () {
    let speech = new Speech();

    const dates = await finals.getDates((new Date()).getMonth());
    

    speech.say("Finals this quarter start on")
          .say(dates.shift())
          .say("and last until")
          .say(dates.pop());

    this.emit(':tell', speech.ssml(true));
}


