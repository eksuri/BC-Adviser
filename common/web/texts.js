const fetch = require('node-fetch');

const regex = new RegExp ('\"title(.*)','g'); 
const regex2 = new RegExp ('title\":\"(.*?)\".*?\"author\":\"(.*?)\"','g'); 


exports.getTexts = async (className, classNumber, itemNumber, callback) => {
    const regex3 = new RegExp ('http:\/\/bellevue\.verbacompare\.com(.*)__' + itemNumber, 'g');
    getBookStoreRegex(className, classNumber, itemNumber, regex, regex2, regex3, (data) => callback(data));
};

async function getBookStoreRegex (className, classNumber, itemNumber, regex, regex2, regex3, callback){
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

async function getBookStore(className, classNumber, itemNumber, regex, callback){
    //http://bellevue.verbacompare.com/comparison?id=F18__CS__300__3473
    
    getClasses(className, (data) => {
        match = regex.exec(data);
    
        https.getHttp(match[0], (data2) => {
            decodeHtmlEntity(data2);
            callback(data2)
        })
    })
}

async function getClasses(className, callback) {
    https.get('https://www.bellevuecollege.edu/classes/Spring2018/' + className.toUpperCase(), (data) => {
        decodeHtmlEntity(data);
        callback(data)
    })
}

// hopefully no one's regex is relying on Html entitys or this will have to be pushed farther down the line
async function decodeHtmlEntity(str) {
    return str.replace(/&#(\d+);/g, function(match, dec) {
      return String.fromCharCode(dec);
    });
};

