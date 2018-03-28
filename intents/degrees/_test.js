const conversation = require('alexa-conversation');
const app = require('../../index.js');
const config = require('../../config.json');

const opts = {
    name: 'BellevueDegrees',
    appId: config.appId,
    app: app,
    fixSpaces: true
};

conversation(opts)
    .userSays('BellevueDegrees', {"program": "bachelors degrees"})
    .plainResponse
        .shouldContain("Health Promotion and Management")
    .end();