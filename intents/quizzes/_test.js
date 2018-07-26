const conversation = require('alexa-conversation');
const app = require('../../index.js');
const config = require('../../config.json');

let opts = config.opts;
    opts.name = 'Quizzes Intent';
    opts.app = app;
    opts.handler = app.handler;

conversation(opts)
    .userSays('GetQuizzesIntent')
    .plainResponse
        .shouldContain("Test")
    .end();