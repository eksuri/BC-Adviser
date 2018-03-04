const https = require('./get');

 const regex = /<span class=\"courseID\">MATH 152(.*)View details for MATH 152<\/a>/g; 
 const regex2 =  /Recommended: (.*)\./g;


exports.getRecommended = (subject, number, callback) => {
    var recommendedClasses = "";

    let url = "https://www.bellevuecollege.edu/classes/All/MATH";// + subject.toUpperCase;
    https.get(url, (data) => {
        var data2 = data.replace(/&amp;/g, "&");
        var data3 = data2.replace(/&/g, "");

        var theClass;
        if ((match = regex.exec(data3))) {
            //console.log(match)

            if(match2 = regex2.exec(match[1]))
            {
                recommendedClasses = match[1];
                callback(recommendedClassses);
            }
           
        }

        callback(recommendedClasses);
    })
};