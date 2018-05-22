const conversation = require('alexa-conversation');
const app = require('../../index.js');
const config = require('../../config.json');

const opts = {
    name: 'BookIntent',
    appId: config.appId,
    app: app,
    fixSpaces: true
};

conversation(opts)
    .userSays('BookIntent', { "CourseAbbrev":"art", "CourseNumber":"101", "ItemNumber":"0650"})
    .plainResponse
        .shouldEqual("Books required for art 101 item number 0650 are: Architect.+Interior Design, by Harwood.")
    .end();