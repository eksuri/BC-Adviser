const conversation = require('alexa-conversation');
const app = require('../../index.js');
const config = require('../../config.json');

let opts = config.opts;
    opts.name = 'Books Intent';
    opts.app = app;
    opts.handler = app.handler;

conversation(opts)
    .userSays('BookIntent', { "subject":"cs", "number":"341", "quarter": "fall", "year": "2018"})
    .plainResponse
        .shouldEqual("There are 2 different sections available for acct 101 in summer 2018 Please check online for your book.")
    .end();