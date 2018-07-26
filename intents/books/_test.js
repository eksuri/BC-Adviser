const conversation = require('alexa-conversation');
const app = require('../../index.js');
const config = require('../../config.json');

let opts = config.opts;
    opts.name = 'Books Intent';
    opts.app = app;
    opts.handler = app.handler;

conversation(opts)
    .userSays('BookIntent', { "subject":"acct", "number":"101", "courseId":"4000", "quarter": "winter", "year": "2018"})
    .plainResponse
        .shouldEqual("Books required for acct 101 item number 4000 are Horngren&apos;s Acct. Financial Chpt.(Ll) W/ Access Code, by Nobles.")
    .end();