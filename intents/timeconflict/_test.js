const conversation = require('alexa-conversation');
const app = require('../../index.js');
const config = require('../../config.json');

let opts = config.opts;
    opts.name = 'Time Conflict Intent';
    opts.app = app;
    opts.handler = app.handler;

// tests exceed 5000ms, need to update

conversation(opts)

  
    //Test 1: There is time conflict between a T,Th,F and a Daily class.
    .userSays('TimeConflictIntent', { "CourseAbbrevOne":"CS", "CourseNumberOne":"401", "CourseAbbrevTwo":"ART", "CourseNumberTwo":"112", "Quarter":"Spring", "Year":"2018"})
    .plainResponse
        .shouldEqual("You can not take CS401 and ART112 in the Spring 2018 because the class schedule is overlapping, you should choose one of them!")
    /*
    //Test 2: There is no time conflict.
    .userSays('TimeConflictIntent', { "CourseAbbrevOne":"CS", "CourseNumberOne":"410", "CourseAbbrevTwo":"CS", "CourseNumberTwo":"455", "Quarter":"Spring", "Year":"2018"})
    .plainResponse
        .shouldEqual("Of course, you can take CS410 and CS455 in the Spring 2018, there is no overlapping")

    //Test 3: No conflict with a online case
    .userSays('TimeConflictIntent', { "CourseAbbrevOne":"CS", "CourseNumberOne":"410", "CourseAbbrevTwo":"CS", "CourseNumberTwo":"101", "Quarter":"Spring", "Year":"2018"})
    .plainResponse
        .shouldEqual("Of course, you can take CS410 and CS101 in the Spring 2018, there is no overlapping")
    
        //Test 4: Multiple time class offerd
    .userSays('TimeConflictIntent', { "CourseAbbrevOne":"CS", "CourseNumberOne":"401", "CourseAbbrevTwo":"CS", "CourseNumberTwo":"210", "Quarter":"Spring", "Year":"2018"})
    .plainResponse
        .shouldEqual("Of course, you can take CS401 and CS210 in the Spring 2018, there is no overlapping")
    */
    .end();