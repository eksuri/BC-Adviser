'use strict';
const Alexa = require('alexa-sdk');
const intents = require('./intents');
const config = require('./config.json')

exports.handler = function (event, context, callback) {
    const alexa = Alexa.handler(event, context, callback);
    alexa.appId = config.appId;
    alexa.registerHandlers(intents.handlers);
    alexa.execute();
};