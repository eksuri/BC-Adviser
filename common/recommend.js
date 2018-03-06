const https = require('./get');


exports.getRecommended = (subject, classNumber, type, callback) => {
    const regex = new RegExp ('courseID\\">' + subject.toUpperCase() + '(\\&?) ' + classNumber + '((.|\\n|\\r)*?)' + type + ': ((.|\\n|\\r)*?)<\\/p>','g'); 
    let url = "https://www.bellevuecollege.edu/classes/All/" + subject.toUpperCase();
    https.get(url, (data) => {
        let encoded= unescape(regex.exec(data)[4]);
        let decoded = encoded.replace(/&amp;/g, '');
        callback(decoded)
    })
};