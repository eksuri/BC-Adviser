const conversation = require('alexa-conversation');
const app = require('../../index.js');
const config = require('../../config.json');

const opts = {
    name: 'Degrees',
    appId: config.appId,
    app: app,
    fixSpaces: true
};

conversation(opts)
    .userSays('Degrees', {"program": "associates"})
    .plainResponse
        .shouldContain("asdfhjkladfsasds")
    .end();