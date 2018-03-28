const conversation = require('alexa-conversation');
const app = require('../../index.js');
const config = require('../../config.json');

const opts = {
  name: 'About Intent',
  appId: config.appId,
  app: app,
  fixSpaces: true
};

conversation(opts)
  .userSays('AboutIntent')
    .plainResponse 
      .shouldEqual("This application was made by Seniors at Bellevue College working on their Capstone for Computer Science.")
  .end();