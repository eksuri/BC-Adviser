const conversation = require('alexa-conversation');
const app = require('../../index.js');
const config = require('../../config.json');

let opts = config.opts;
    opts.name = 'Degrees Intent';
    opts.app = app;
    opts.handler = app.handler;

conversation(opts)
    .userSays('Degrees', {"program": "associates"})
    .plainResponse
        .shouldContain("Associate")
    .end();