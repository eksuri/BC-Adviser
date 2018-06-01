const conversation = require('alexa-conversation');
const app = require('../../index.js');
const config = require('../../config.json');

let opts = config.opts;
    opts.name = 'Class Schedule Intent';
    opts.app = app;
    opts.handler = app.handler;

conversation(opts)

    //Test 1: The class is held Tuesday/Thursday and Friday.
    .userSays('ClassScheduleIntent', { "CourseAbbrev":"CS", "CourseNumber":"410", "Quarter":"Spring", "Year":"2018"})
    .plainResponse
        .shouldEqual("CS401 will be available in the Spring2018 at Bellevue College : Tuesday Thursday 10:30am-12:20pm Friday 1:30pm-2:20pm")
        .end()/*       
    //Test 2: The class is held Monday/Wednesday and Friday
    .userSays('ClassScheduleIntent', { "CourseAbbrev":"CS", "CourseNumber":"410", "Quarter":"Spring", "Year":"2018"})
    .plainResponse
        .shouldEqual("CS410 will be available in the Spring2018 at Bellevue College : Monday Wednesday 12:30pm-2:20pm Friday 11:30am-12:20pm")
    
    //Test 3: The class is held Tuesday/Thursday
    .userSays('ClassScheduleIntent', { "CourseAbbrev":"CS", "CourseNumber":"455", "Quarter":"Spring", "Year":"2018"})
    .plainResponse
        .shouldEqual("CS455 will be available in the Spring2018 at Bellevue College : Tuesday Thursday 4:30pm-6:20pm")
    
    //Test 4: The class is held multiple times
    .userSays('ClassScheduleIntent', { "CourseAbbrev":"CS", "CourseNumber":"211", "Quarter":"Spring", "Year":"2018"})
    .plainResponse
        .shouldEqual("CS211 will be available in the Spring2018 at Bellevue College : Daily 11:30am-12:20pm; Daily 1:30pm-2:20pm; Tuesday Thursday 3:00pm-5:10pm; Tuesday Thursday 5:30pm-7:40pm; Online")   

    //Test 5: The class is online
    .userSays('ClassScheduleIntent', { "CourseAbbrev":"CS", "CourseNumber":"101", "Quarter":"Spring", "Year":"2018"})
    .plainResponse
        .shouldEqual("CS101 will be available in the Spring2018 at Bellevue College : Online")
    //Test 6: The class is not found - the class exists but is not offered in the requested quarter
    .userSays('ClassScheduleIntent', { "CourseAbbrev":"CS", "CourseNumber":"300", "Quarter":"Spring", "Year":"2018"})
    .plainResponse
        .shouldEqual("There are no information yet about the schedule of this class, or you entered wrong variables. Please check what class are offred in Spring 2018 for the desired subject; in order to find if this class is offered at Bellevue College")

    //Test 7: The class is not found because of a wrong variable
    .userSays('ClassScheduleIntent', { "CourseAbbrev":"SomeInput", "CourseNumber":"401", "Quarter":"Spring", "Year":"2018"})
    .plainResponse
        .shouldEqual("There are no information yet about the schedule of this class, or you entered wrong variables. Please check what class are offred in Spring 2018 for the desired subject; in order to find if this class is offered at Bellevue College")

    //Test 8: Incomplete variable - The user did not entered one variable
    .userSays('ClassScheduleIntent', { "CourseAbbrev":"CS", "CourseNumber":"401", "Quarter": "Spring", "Year": null})
    .plainResponse
        .shouldEqual("You did not enter all the required variables. You should enter a course abreviation, a course number, a quarter, and a year.")    
        .end();
        */