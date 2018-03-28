const conversation = require('alexa-conversation');
const app = require('../../index.js');
const config = require('../../config.json');

const opts = {
    name: 'Class Offered Intents',
    appId: config.appId,
    app: app,
    fixSpaces: true
};

conversation(opts)
    .userSays('ClassesOfferedIntent', {"Quarter": "summer", "Year": "2018", "Subjects": "ocea"})
    .plainResponse
        .shouldEqual("For the summer2018 quarter at Bellevue College are offered following classes: Environmental Oceanography")
    .end();