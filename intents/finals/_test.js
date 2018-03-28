const conversation = require('alexa-conversation');
const app = require('../../index.js');
const config = require('../../config.json');

const opts = {
    name: 'GetFinalsInfoIntent',
    appId: config.appId,
    app: app,
    fixSpaces: true
};

conversation(opts)
    .userSays('GetFinalsInfoIntent')
    .plainResponse
        .shouldContain("Finals this quarter")
    .end();