const https = require('./get');

exports.getRating = (firstName, lastName, callback) => {
    const regex = new RegExp ('ShowRatings\\.jsp\\?tid=(.*)"[\\s\\S]*' + lastName + ', ' + firstName, 'g');
    getProfessorInfo(firstName, lastName, regex, (data) => callback(data));
};

function getProfessorInfo (firstName, lastName, regex, callback) {
    getProfessorID(firstName, lastName, regex, (id) => {
        console.log("ID!")
        console.log(id)
        https.getHttp('http://www.ratemyprofessors.com/ShowRatings.jsp?tid=' + id, (data) => {
            const regex = /Overall Quality[\s\S]*title="">(.*)<[\s\S]*Would Take Again[\s\S]*?<div class="grade" title="">\s(.*)[\s\S]*?Level of Difficulty[\s\S]*?title="">\s(.*)[\s\S]*<img src="\/assets\/chilis\/(.*)/g

            

            if (match = regex.exec(data))
            {

            }

            
            callback(match);
        })


        // let array = [];
        // while ((match2 = regex2.exec(reducedData))) {
        //     match2.shift(); // shift out match[0], only groups left
        //     match2.forEach((s) => {
        //         // array.push(s);
        //         t = s.replace("u0026", "&");
        //         array.push(t);
        //     })
        // }
        // callback(array);
    })
};

function getProfessorID(firstName, lastName, regex, callback){
    getProfessor(firstName, lastName, (data) => {
        match = regex.exec(data);
        callback(match[1]);
        })   
}

function getProfessor(firstName, lastName, callback) {
    https.getHttp('http://www.ratemyprofessors.com/search.jsp?queryoption=HEADER&queryBy=teacherName&schoolName=Bellevue+College&schoolID=1553&query=' + firstName + '+' + lastName, (data) => {
        decodeHtmlEntity(data);
        // console.log("TEST");
        callback(data)
    })
}

// hopefully no one's regex is relying on Html entitys or this will have to be pushed farther down the line
function decodeHtmlEntity(str) {
    return str.replace(/&#(\d+);/g, function(match, dec) {
      return String.fromCharCode(dec);
    });
};

