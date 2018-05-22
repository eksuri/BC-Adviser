const https = require('./get');

const regex = new RegExp ('\"title(.*)','g'); 
const regex2 = new RegExp ('title\":\"(.*?)\".*?\"author\":\"(.*?)\"','g'); 


exports.getTexts = (className, classNumber, itemNumber, callback) => {
    const regex3 = new RegExp ('http:\/\/bellevue\.verbacompare\.com(.*)__' + itemNumber, 'g');
    getBookStoreRegex(className, classNumber, itemNumber, regex, regex2, regex3, (data) => callback(data));
};

function getBookStoreRegex (className, classNumber, itemNumber, regex, regex2, regex3, callback){
    getBookStore(className, classNumber, itemNumber, regex3, (data) => {

        let reducedData;
        match = regex.exec(data);
        match.shift();
        reducedData = match[0];    

        let array = [];
        while ((match2 = regex2.exec(reducedData))) {
            match2.shift(); // shift out match[0], only groups left
            match2.forEach((s) => {
                // array.push(s);
                t = s.replace("u0026", "&");
                array.push(t);
            })
        }
        callback(array);
    })
};

function getBookStore(className, classNumber, itemNumber, regex, callback){
    getClasses(className, (data) => {
        match = regex.exec(data);
    
        https.getHttp(match[0], (data2) => {
            decodeHtmlEntity(data2);
            //console.log(data2);
            callback(data2)
        })
    })


    // This code tries to go directly to the BC Bookstore and retrieve the page for the given class and item number.  We aren't doing it
    // this way anymore...
    // if (className.includes("&"))
    // {
    //     className.replace("&", "");
    //     https.getHttp('http://bellevue.verbacompare.com/comparison?id=S18__' + className + '__' + classNumber + '%26__' + itemNumber, (data) => {
    //     callback(data);
    //     });
    // }
    // else
    // {
    //     https.getHttp('http://bellevue.verbacompare.com/comparison?id=S18__' + className + '__' + classNumber + '__' + itemNumber, (data) => {
    //     callback(data);
    // });
    // }
}

function getClasses(className, callback) {
    https.get('https://www.bellevuecollege.edu/classes/Spring2018/' + className.toUpperCase(), (data) => {
        decodeHtmlEntity(data);
        callback(data)
    })
}

// hopefully no one's regex is relying on Html entitys or this will have to be pushed farther down the line
function decodeHtmlEntity(str) {
    return str.replace(/&#(\d+);/g, function(match, dec) {
      return String.fromCharCode(dec);
    });
};

