const conversation = require('alexa-conversation');
const app = require('../../index.js');
const config = require('../../config.json');

let opts = config.opts;
    opts.name = 'Rating Intent';
    opts.app = app;
    opts.handler = app.handler;

conversation(opts)
    .userSays('RatingIntent', {"quarter": "Fall", "year": "2018", "subject": "CS", "number": "211"})
    .plainResponse
        .shouldEqual("On a scale of 0 to 5, Professor Bill Iverson has an overall rating of 3.5 and a level of difficulty of 3.6 69% percent of students would take Professor Iverson again")
    .end();