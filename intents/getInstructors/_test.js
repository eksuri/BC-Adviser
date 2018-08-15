const conversation = require('alexa-conversation');
const app = require('../../index.js');
const config = require('../../config.json');

let opts = config.opts;
    opts.name = 'Get Instructor Intent';
    opts.app = app;
    opts.handler = app.handler;

conversation(opts)
    .userSays('GetInstructorsIntent', {"quarter": "Fall", "year": "2018", "subject": "CS", "number": "211"})
    .plainResponse
        .shouldEqual("The instructors for CS 211 in Fall 2018 are Taesik Kim James Livingston Craig Niiyama")
    .end();