const conversation = require('alexa-conversation');
const app = require('../../index.js');
const config = require('../../config.json');

const opts = {
  name: 'Amazon Intents',
  appId: config.appId,
  app: app,
  fixSpaces: true
};

conversation(opts)
  .userSays('AMAZON.CancelIntent')
    .plainResponse 
      .shouldEqual("Goodbye!")
      .shouldNotEqual("I'm not sure I followed...")
  .userSays('AMAZON.HelpIntent')
    .plainResponse 
      .shouldEqual("You can ask me which days finals, or you can exit... What can I help you with?")
      .shouldNotEqual("I'm not sure I followed...")
  .userSays('AMAZON.StopIntent')
    .plainResponse 
      .shouldEqual('Goodbye!')
      .shouldNotEqual("I'm not sure I followed...")
  .end();