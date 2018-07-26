const fetch = require('node-fetch');

exports.getTexts = async (quarterString, courseName, courseNumber, courseId) => {

    //http://bellevue.verbacompare.com/comparison?id=F18__ART__101__0650
    //http://bellevue.verbacompare.com/comparison?id=W18__ACCT__101__4000
    // F = Fall
    // W = Winter
    // S = Spring
    // X = Summer

    const quarterSlug = quarterString
        .replace(" 20", "")
        .replace("Fall", "F")
        .replace("Winter", "W")
        .replace("Spring", "S")
        .replace("Summer", "X");

    const bookUrl = "http://bellevue.verbacompare.com/comparison?id="+ quarterSlug
                                                              + "__" + courseName
                                                              + "__" + courseNumber
                                                              + "__" + courseId
                                                      

    const res = await fetch(bookUrl);
    const data = await res.text();


    const regexFirst = new RegExp('\"title(.*)', 'g');
    const regexSecond = new RegExp('title\":\"(.*?)\".*?\"author\":\"(.*?)\"', 'g');

    const matchFirst = regexFirst.exec(data);

    let result = [];
    while ((matchSecond = regexSecond.exec(matchFirst[1]))) {
        matchSecond.shift();
        matchSecond.forEach((s) => {
            result.push(s.replace("u0026", "&"));
        })
    }
    return result;
};

