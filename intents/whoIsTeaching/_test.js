//Created by Marius Popescu - 7.mariuspopescu.10@gmail.com 
const conversation = require('alexa-conversation');
const app = require('../../index.js');
const config = require('../../config.json');

const opts = {
    name: 'WhoIsTeachingIntent',
    appId: config.appId,
    app: app,
    fixSpaces: true
};

conversation(opts)
    //Test 1: The class is thaught by only one teacher - the answer will have no commas and white space.
    .userSays('WhoIsTeachingIntent', { "CourseAbbrev":"CS", "CourseNumber":"401", "Quarter":"Spring", "Year":"2018"})
    .plainResponse
        .shouldEqual("This class is thaught at Bellevue College by: Fatma Serce")
    
        //Test 2: The class is thaught by more than one teacher  - the answer will not include duplicates and will have, commas, white spaces and "and"
    .userSays('WhoIsTeachingIntent', { "CourseAbbrev":"CS", "CourseNumber":"210", "Quarter":"Spring", "Year":"2018"})
    .plainResponse
        .shouldEqual("This class is thaught at Bellevue College by: Bill Iverson, Michael Dela Rosa, Fatma Serce, and Sara Farag")
    
        //Test 3: The class is not found - the class exists but is not offered in the requested quarter
    .userSays('WhoIsTeachingIntent', { "CourseAbbrev":"CS", "CourseNumber":"300", "Quarter":"Spring", "Year":"2018"})
    .plainResponse
        .shouldEqual("There are no information yet about who will teach this class, or you entered wrong variables. Please check what class are offred in Spring 2018 for the desired subject; in order to find if this class is offered at Bellevue College")
    
        //Test 4: The class is not found - wrong course abbreviation
    .userSays('WhoIsTeachingIntent', { "CourseAbbrev":"SomeInput", "CourseNumber":"401", "Quarter":"Spring", "Year":"2018"})
    .plainResponse
        .shouldEqual("There are no information yet about who will teach this class, or you entered wrong variables. Please check what class are offred in Spring 2018 for the desired subject; in order to find if this class is offered at Bellevue College")
    
        //Test 5: The class is not found - wrong course number
    .userSays('WhoIsTeachingIntent', { "CourseAbbrev":"CS", "CourseNumber":"SomeInput", "Quarter":"Spring", "Year":"2018"})
    .plainResponse
        .shouldEqual("There are no information yet about who will teach this class, or you entered wrong variables. Please check what class are offred in Spring 2018 for the desired subject; in order to find if this class is offered at Bellevue College")
    
        //Test 6: The class is not found - wrong quarter
    .userSays('WhoIsTeachingIntent', { "CourseAbbrev":"CS", "CourseNumber":"401", "Quarter":"SomeInput", "Year":"2018"})
    .plainResponse
        .shouldEqual("There are no information yet about who will teach this class, or you entered wrong variables. Please check what class are offred in SomeInput 2018 for the desired subject; in order to find if this class is offered at Bellevue College")    
    
        //Test 7: The class is not found - wrong year
    .userSays('WhoIsTeachingIntent', { "CourseAbbrev":"CS", "CourseNumber":"SomeInput", "Quarter":"Spring", "Year":"SomeInput"})
    .plainResponse
        .shouldEqual("There are no information yet about who will teach this class, or you entered wrong variables. Please check what class are offred in Spring SomeInput for the desired subject; in order to find if this class is offered at Bellevue College")
    
        //Test 8: Incomplete variable - The user did not entered the year
    .userSays('WhoIsTeachingIntent', { "CourseAbbrev":"CS", "CourseNumber":"401", "Quarter": "Spring", "Year": null})
    .plainResponse
        .shouldEqual("You did not enter all the required variables. You should enter a course abreviation, a course number, a quarter, and a year.")    
    
        //Test 9: Incomplete variable - The user did not entered all the variable
    .userSays('WhoIsTeachingIntent', { "CourseAbbrev": "CS", "CourseNumber": "401", "Quarter": null, "Year": "2018"})
    .plainResponse
        .shouldEqual("You did not enter all the required variables. You should enter a course abreviation, a course number, a quarter, and a year.")      
    
        //Test 10: Incomplete variable - The user did not entered the course number
    .userSays('WhoIsTeachingIntent', { "CourseAbbrev":"CS", "CourseNumber": null, "Quarter": "Spring", "Year": "2018"})
    .plainResponse
        .shouldEqual("You did not enter all the required variables. You should enter a course abreviation, a course number, a quarter, and a year.")
    
        //Test 11: Incomplete variable - The user did not entered the course abreviation
    .userSays('WhoIsTeachingIntent', { "CourseAbbrev": null, "CourseNumber":"401", "Quarter": "Spring", "Year": "2018"})
    .plainResponse
        .shouldEqual("You did not enter all the required variables. You should enter a course abreviation, a course number, a quarter, and a year.")   
        .end();