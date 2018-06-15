const conversation = require('alexa-conversation');
const app = require('../../index.js');
const config = require('../../config.json');

let opts = config.opts;
    opts.name = 'Books Intent';
    opts.app = app;
    opts.handler = app.handler;

conversation(opts)
    .userSays('BookIntent', { "CourseAbbrev":"art", "CourseNumber":"101", "ItemNumber":"0650"})
    .plainResponse
        .shouldEqual("Books required for art 101 item number 0650 are: Architect.+Interior Design, by Harwood.")
    .end();