const conversation = require('alexa-conversation');
const app = require('../../index.js');
const config = require('../../config.json');

const opts = {
    name: 'RetakeClassIntent',
    appId: config.appId,
    app: app,
    fixSpaces: true
};

conversation(opts)
    .userSays('RetakeClassIntent', { "CourseAbbrev":"CS", "CourseNumber":"101"})
    .plainResponse
        .shouldEqual("This class is offered at Bellevue College Summer 2017 Winter 2018")
    .end();