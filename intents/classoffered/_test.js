const conversation = require('alexa-conversation');
const app = require('../../index.js');
const config = require('../../config.json');

let opts = config.opts;
    opts.name = 'About Intent';
    opts.app = app;
    opts.handler = app.handler;

conversation(opts)
    .userSays('ClassesOfferedIntent', {"Quarter": "summer", "Year": "2018", "Subjects": "ocea"})
    .plainResponse
        .shouldEqual("The following ocea classes are offered summer 2018 Introduction to Oceanography w/ Lab Environmental Oceanography")
    .end();