# BC Adviser
## Introduction

BC Adviser is a Amazon Alexa Skills application developed at Bellevue College as part of a Senior Capstone. The goal of BC Adviser is to take information about Bellevue College that's hard to find on the BC site or that might require a visit to an adviser and expose it with a simple voice powered interface. BC-Adviser will also integrate with Canvas and RateMyProfessor to give reviews on professors and other information about grades and courses.

# Requirements

## Dependencies

* Node 8.10
* Yarn
* Alexa 'Ask SDK' 2.0
* Node Fetch
* SSML-Builder
* Mocha
* Alexa-Conversation

## Setup

To setup the application, git clone the repository. Then change directory into the root of the new folder, and run 'yarn' or 'npm' to install packaged dependancines. Then create a config.json file in the root as follows:
    
    {
        "opts": {
            "appId": "amzn1.ask.skill.some-app-id",
            "sessionId": "SessionId.some-session-id",
            "userId": "amzn1.ask.account.some-user-id",
            "accessToken": "some-access-token",
            "requestId": "EdwRequestId.some-request-id",
            "locale": "en-US",
            "contextObj": null,
            "fixSpaces": true,
            "fuzzyDistance": 0.93
        }
    }
    
    
You'll need to create a Amazon Alexa skill in the amazon developer portal. Copy the contents from [./schema.json](https://github.com/eksuri/BC-Adviser/tree/master/schema.json) to the json editor, this is a description for Amazon of everything our skill can do.

Then, create a .zip of all code with index.js at the root. Upload this to a new AWS Lambda skill, select node v8.10 as your runtime and make sure your entry point is index.Handler. Finally, select Amazon Alexa as a trigger for you lambda function, so Alexa can trigger this code.

## Architecture

BC-Adviser is built to run in Node v8.10, and uses [alexa-conversation](https://github.com/eksuri/alexa-conversation#refs/heads/jgamell/addContextObject) with mocha for test coverage. Intents are added to this alexa skill are modular fashion and new intents can be added to the [intents](https://github.com/eksuri/BC-Adviser/tree/master/intents) folder and by adding them to [intents/index.js](https://github.com/eksuri/BC-Adviser/tree/master/intents/index.js).

Common code is moved out of indivdual intents into [common](https://github.com/eksuri/BC-Adviser/tree/master/common).

 Another component of BC Adviser is our schema build tool. Each intent 'module' has it's own _schema.json file, and when you run yarn build, it will compile all of the various schemas into a single schema at root so you can upload that to the Alexa Developer Portal.

### Lifecycle

The lifecycle of the application is as follows:

At the start, the user will make a request to the application through a voice powered device like the Amazon Echo. Your device will send this audio to Amazon Alexa, which uses the schema you've provided to discern what 'intent' you're trying to activate and to parse any variables from the user. Alexa will send an event in the form of a json object to AWS Lambda, and your index.Handler(event) entrypoint gets called with the event passed as an argument.

From there, the event will go through the 'router' at ./intents/index.js until it finds the appropriate handler for the specific intent. That handler will handle generating the speech response and call various functions from ./common/ to fill in any variables or logic it needs.

### Moudle Structure

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

Each intent module has it's own defined schema. Commonly used schema types and all elicitations are generated in [./build_schema.js](https://github.com/eksuri/BC-Adviser/blob/master/intents/build_schema.js) ;

The schema for the whole application can be build by running node build_schema.js. The schema for an individual intent should look as follows:

    {
        "intents": [
            {
                "name": "IntentName",
                "slots": [
                    {
                        "name": "food"
                        "type": "FOOD"
                    }
                ],
                "samples": [
                    "how many {food} are available"
                ]
            }
        ],
        "types" : [
            {
                "name": "FOOD",
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
    },
    "dialogs": [
      {
        "name": "IntentName",
        "confirmationRequired": false,
        "prompts": {},
        "slots": [
          {
            "name": "FOOD",
            "type": "SUBJECT",
            "confirmationRequired": false,
            "elicitationRequired": true,
            "prompts": {
              "elicitation": "food_elication"
            }
          }
        ]
      }
    ]

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



# Next Steps
