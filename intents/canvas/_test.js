const conversation = require('alexa-conversation');
const app = require('../../index.js');
const config = require('../../config.json');

let opts = config.opts;
    opts.name = 'Canvas Intent';
    opts.app = app;
    opts.handler = app.handler;

conversation(opts)
  .userSays('MyClassesIntent')
    .plainResponse 
      .shouldEqual("This quarter you&apos;re currently enrolled in CS 483 Senior Capstone III")
  .end();