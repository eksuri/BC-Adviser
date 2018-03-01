'use strict';
const Alexa = require('alexa-sdk');
const intents = require('./intents');

const APP_ID = "amzn1.ask.skill.2ff580cc-00a9-40d4-9a88-115f9a2f1ec2";

exports.handler = function (event, context, callback) {
    const alexa = Alexa.handler(event, context, callback);
    alexa.appId = APP_ID;
    alexa.registerHandlers(intents.handlers);
    alexa.execute();
};