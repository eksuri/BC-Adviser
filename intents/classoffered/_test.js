const conversation = require('alexa-conversation');
const app = require('../../index.js');
const config = require('../../config.json');

let opts = config.opts;
    opts.name = 'Class Schedule Intent';
    opts.app = app;
    opts.handler = app.handler;

conversation(opts)
    .userSays('ClassesOfferedIntent', {"quarter": "summer", "year": "2018", "subjects": "ocea"})
    .plainResponse
        .shouldEqual("The following ocea classes are offered summer 2018 Introduction to Oceanography w/ Lab Environmental Oceanography")
    .end();