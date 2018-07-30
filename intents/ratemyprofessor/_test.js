const conversation = require('alexa-conversation');
const app = require('../../index.js');
const config = require('../../config.json');

let opts = config.opts;
    opts.name = 'Rating Intent';
    opts.app = app;
    opts.handler = app.handler;

conversation(opts)
    .userSays('RatingIntent', {"quarter": "Fall", "year": "2018", "subject": "ENGL", "number": "101"})
    .plainResponse
        .shouldEqual("The highest rated professor for ENGL 101 is Thomas Ryan with a rating of 5")
    .end();