# BC-Adviser
Amazon Alexa Skill for Bellevue College Senior Capstone

BC-Adviser is built to run in Node v6.10.3, and uses [alexa-conversation](https://github.com/ExpediaDotCom/alexa-conversation) with mocha for test coverage. Intents are added to this alexa skill are modular fashion and new intents can be added to the [intents](https://github.com/eksuri/BC-Adviser/tree/master/intents) folder and by adding them to [intents/index.js](https://github.com/eksuri/BC-Adviser/tree/master/intents/index.js).

Common code is moved out of indivdual intents into [common](https://github.com/eksuri/BC-Adviser/tree/master/common).

## Moudle Structure

    intents
    ├── index.js // add your intents here so alexa can see them
    ├── degrees
    |   ├── _schema.js
    |   ├── _tests.js
    |   └── index.js
    ├── finals // this is an intent that has to do with finals
    |   ├── _schema.js // here's it's schema
    |   ├── _tests.js // here's it's test cases
    |   └── index.js // here's the function
    ...
    
### Schema

Each intent module has it's own defined schema. Commonly used custom slot types should be moved to [common_types](https://github.com/eksuri/BC-Adviser/blob/master/intents/common_types/_schema.json).

The schema for the whole application can be build by running node build_schema.js. The schema for an individual intent should look as follows:

    {
        "intents": [
            {
                "name": "IntentName",
                "slots": [
                    {
                        "name": "Foods"
                        "type": "LIST_OF_FOODS
                    }
                ],
                "samples": [
                    "how many {Foods}" are avaliable"
                ]
            }
        ],
        "types" : [
            {
                "name": "LIST_OF_FOODS",
                "values": [
                    {
                        "name": {
                            "value": "apples",
                        }
                    },
                    {
                        "name": {
                            "value": "bananas"
                        }
                    }
                ]
            }
        ]
    }

### Tests

Tests are written using [alexa-conversation](https://github.com/ExpediaDotCom/alexa-conversation) and mocha. You must install mocha and alexa-conversation by running
    
    yarn install --dev
Then you can run test cases by running

    yarn test 
Test output can be modified by editing the [reporter](https://mochajs.org/#reporters) defined in package.json.

Here's an example test case.

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

### Config

Before you can build your schema, test, or run this application, you need to create your config.json file. It should have the following fields: 

    {
        "appId": "amzn1.ask.skill.id-goes-here",
        "token": "canvas-token-goes-here"
    }
