'use strict';
const Alexa = require('ask-sdk-v1adapter');
const intents = require('./intents');
const config = require('./config.json')

exports.handler = function (event, context, callback) {
    const alexa = Alexa.handler(event, context, callback);
    alexa.appId = config.opts.appId;
    alexa.registerHandlers(intents.handlers);
    alexa.execute();
};