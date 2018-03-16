const https = require('./get');

// courseID\">MATH\&? 152(?:(?:.|\n|\r)*?) Prerequisite((?:.|\n|\r)*?)<\/p>
// courseID\">MATH\&? 152(.|\n|\r)*?<\/p>

exports.getRecommended = (subject, classNumber, type, callback) => {
    // const regex = new RegExp ('courseID\\">' + subject.toUpperCase() + '\\&? ' + classNumber + '(?:(?:.|\\n|\\r)*?)' + type + ': ((?:.|\\n|\\r)*?)<\\/p>','g'); 
    const regex = new RegExp ('courseID\\">' + subject.toUpperCase() + '\\&? '+  classNumber + '(.|\\n|\\r)*?<\\/p>','g'); 
    const regex2 = new RegExp (type + ': (.*)?<\\/p>','g');
    let url = "https://www.bellevuecollege.edu/classes/All/" + subject.toUpperCase();
    https.get(url, (data) => {
        let encoded = unescape(regex.exec(data)[0]);
        // console.log(encoded);
        let decoded = encoded.replace(/&amp;/g, '');

        // if (match =regex2.exec(decoded))
        // {
        //     match.shift();
        // }
        // let encoded2 = unescape(regex2.exec(decoded)[0]);
        if (match = regex2.exec(decoded))
        {
            match.shift();
        }
        console.log(match);
        callback(match)
    })
}