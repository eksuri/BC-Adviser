const conversation = require('alexa-conversation');
const app = require('../../index.js');
const config = require('../../config.json');

let opts = config.opts;
    opts.name = 'Time Conflict Intent';
    opts.app = app;
    opts.handler = app.handler;

conversation(opts)

    //Test 1: There is time conflict between a T,Th,F and a Daily class.
    .userSays('TimeConflictIntent', { "subjectOne":"CS", "numberOne":"401", "subjectTwo":"ART", "numberTwo":"112", "quarter":"Spring", "year":"2018"})
    .plainResponse
        .shouldEqual("You cannot take both CS 401 and ART 112 Spring 2018")
   
    //Test 2: There is no time conflict.
    .userSays('TimeConflictIntent', { "subjectOne":"CS", "numberOne":"410", "subjectTwo":"CS", "numberTwo":"455", "quarter":"Spring", "year":"2018"})
    .plainResponse
        .shouldEqual("Of course, you can take both CS 410 and CS 455 Spring 2018")

    //Test 3: No conflict with a online case
    .userSays('TimeConflictIntent', { "subjectOne":"CS", "numberOne":"410", "subjectTwo":"CS", "numberTwo":"101", "quarter":"Spring", "year":"2018"})
    .plainResponse
        .shouldEqual("Of course, you can take both CS 410 and CS 101 Spring 2018")
    
        //Test 4: Multiple time class offerd
    .userSays('TimeConflictIntent', { "subjectOne":"CS", "numberOne":"401", "subjectTwo":"CS", "numberTwo":"210", "quarter":"Spring", "year":"2018"})
    .plainResponse
        .shouldEqual("Of course, you can take both CS 401 and CS 210 Spring 2018")
    
    .end();