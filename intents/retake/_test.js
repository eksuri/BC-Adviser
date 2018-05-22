const conversation = require('alexa-conversation');
const app = require('../../index.js');
const config = require('../../config.json');

let opts = config.opts;
    opts.name = 'About Intent';
    opts.app = app;
    opts.handler = app.handler;

conversation(opts)
    .userSays('RetakeClassIntent', { "CourseAbbrev":"CS", "CourseNumber":"300"})
    .plainResponse
        .shouldEqual("This class is offered at Bellevue College Fall 2018")
    .end();