const conversation = require('alexa-conversation');
const app = require('../../index.js');
const config = require('../../config.json');

const opts = {
    name: 'RatingIntent',
    appId: config.appId,
    app: app,
    fixSpaces: true
};

conversation(opts)
    .userSays('RatingIntent', {"FirstName":"Bill", "LastName":"Iverson"})
    .plainResponse
        .shouldContain("Professor")
    .end();