const conversation = require('alexa-conversation');
const app = require('../../index.js');
const config = require('../../config.json');

const opts = {
  name: 'Canvas Intents',
  appId: config.appId,
  app: app,
  fixSpaces: true
};

conversation(opts)
  .userSays('MyClassesIntent')
    .plainResponse 
      .shouldEqual("This quarter you're currently enrolled in FERPA Training Staff-Canvas Orientation")
  .userSays('MyGradesIntent')
    .plainResponse 
      .shouldContain("grade")
  .end();