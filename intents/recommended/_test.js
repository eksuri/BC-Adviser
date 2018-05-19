const conversation = require('alexa-conversation');
const app = require('../../index.js');
const config = require('../../config.json');

const opts = {
    name: 'PrerequisiteIntent',
    appId: config.appId,
    app: app,
    fixSpaces: true
};

conversation(opts)
    .userSays('PrerequisiteIntent', { "CourseAbbrev":"math", "CourseNumber":"078"})
    .plainResponse
        .shouldEqual("Prerequisites for math 078 include completion of MATH 070 with a C or better, MATH 075 with a grade of B or higher, or placement by assessment.")
    .end();