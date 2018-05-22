'use strict';
const Alexa = require('ask-sdk-v1adapter');
const intents = require('./intents');
const config = require('./config.json')

exports.handler = function (event, context, callback) {
    const alexa = Alexa.handler(event, context, callback);
    alexa.appId = config.opts.appId;
    alexa.registerHandlers(intents.handlers);
    alexa.registerV2Handlers(intents.handlers_v2); // New API functions for registering v2 request handlers
    alexa.execute();
};
