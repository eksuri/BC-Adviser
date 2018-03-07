'use strict';
const Alexa = require('alexa-sdk');
const intents = require('./intents');

// const APP_ID = "amzn1.ask.skill.2ff580cc-00a9-40d4-9a88-115f9a2famzn1.ask.skill.b4915257-301c-47d5-b2d7-9cf59619d376";

const APP_ID = "amzn1.ask.skill.b4915257-301c-47d5-b2d7-9cf59619d376";


exports.handler = function (event, context, callback) {
    const alexa = Alexa.handler(event, context, callback);
    alexa.appId = APP_ID;
    alexa.registerHandlers(intents.handlers);
    alexa.execute();
};