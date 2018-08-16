const conversation = require('alexa-conversation');
const app = require('../../index.js');
const config = require('../../config.json');

let opts = config.opts;
    opts.name = 'Class Schedule Intent';
    opts.app = app;
    opts.handler = app.handler;

conversation(opts)

    .userSays('ClassScheduleIntent', { "subject":"CS", "number":"410", "quarter":"Spring", "year":"2018"})
    .plainResponse
      .shouldEqual("CS 410 is offered Monday Wednesday 12 30 pm to 2 20 pm Friday 11 30 am to 12 20 pm")
    .end()