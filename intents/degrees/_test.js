const conversation = require('alexa-conversation');
const app = require('../../index.js');
const config = require('../../config.json');

let opts = config.opts;
    opts.name = 'Degrees Intent';
    opts.app = app;
    opts.handler = app.handler;

    process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0; // hack for BC misconfigured SSL

conversation(opts)
    .userSays('Degrees', {"program": "non transfer"})
    .plainResponse
        .shouldContain("zzzzz")
    .end();