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
      .shouldEqual("This quarter you&apos;re currently enrolled in BIOL 150 Marine Biology CS 401 Algorithms CS 455 Cloud Computing CS 482 Senior Capstone II")
  .userSays('MyGradesIntent')
    .plainResponse 
      .shouldContain("grade")
  .end();