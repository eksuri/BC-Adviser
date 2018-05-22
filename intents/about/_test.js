const conversation = require('alexa-conversation');
const app = require('../../index.js');
const config = require('../../config.json');

let opts = config.opts;
    opts.name = 'About Intent';
    opts.app = app;
    opts.handler = app.handler;

conversation(opts)
  .userSays('AboutIntent')
    .plainResponse 
      .shouldEqual("This application was made by Seniors at Bellevue College working on their Capstone for Computer Science.")
  .end();