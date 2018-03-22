const https = require('./get');

// courseID\">MATH\&? 152(?:(?:.|\n|\r)*?) Prerequisite((?:.|\n|\r)*?)<\/p>
// courseID\">MATH\&? 152(.|\n|\r)*?<\/p>

exports.getRecommended = (subject, classNumber, type, callback) => {
    // const regex = new RegExp ('courseID\\">' + subject.toUpperCase() + '\\&? ' + classNumber + '(?:(?:.|\\n|\\r)*?)' + type + ': ((?:.|\\n|\\r)*?)<\\/p>','g'); 
    const regex = new RegExp ('courseID\\">' + subject.toUpperCase() + '\\&? '+  classNumber + '(.|\\n|\\r)*?<\\/p>','g'); 
    const regex2 = new RegExp (type + ': (.*)?<\\/p>','g');
    let url = "/classes/All/" + subject.toUpperCase();
    https.getBCRegex(url, regex, (data) => {
        let encoded = unescape(data);
        let decoded = encoded.replace(/&amp;/g, '');
        if (match = regex2.exec(decoded))
        {
            match.shift();
        }
        callback(match)
    })
}