const fetch = require('node-fetch');

// exports.list= ["bachelors", "associates", "transfer", "non transfer", "professional", "technical", "eastern Washington"];
exports.list= ["bachelors", "bachelor", "associates", "associate", "transfer", "non transfer", "professional", "technical", "certificate", "certificates"];

exports.getDegrees = async (degree_type) => {
    switch (degree_type) {
        case "bachelor":
        case "bachelors":
            return await getBachelorsDegrees();
        case "professional":
        case "technical":
            return await getProfTechDegrees();
        case "certificate":
        case "certificates":
            return await getCertificateDegrees();
        case "transfer":
            return await getTransferDegrees();
        case "non transfer":
            return await getNonTransferDegrees();
        case "associates":
        default:
            return await getTransferDegrees();
            // return await Promise.all([
            //     getTransferDegrees(),
            //     getNonTransferDegrees()]
            // ).then((c) => {return c[0].concat(c[1])});
      }
}


getBachelorsDegrees = async () => {
    // const regex = /<a href=\"https:\/\/www.bellevuecollege.edu\/programs\/degrees\/bachelor.*>.*(?:Arts|Science)\s(?:Degree\s)?(.*)<\/a>/g;
    // const url = "https://www.bellevuecollege.edu/programs/degrees/bachelor/";
    
    const regex = /a href.*?>(.*?), B/g;
    // return await getDegrees(regex, url);
    return await getDegrees2(regex);
}

getProfTechDegrees = async () => {
    // const regex = /<td>(?:<a href=.*?>)?(.*?)(?:<\/a>)?<\/td>\s<td>(.*)<\/td>\s<td>(.*)<\/td>\s<td>(?:<a href=.*?>)?(.*?)(?:<\/a>)?<\/td>/g;
    // const url = "https://www.bellevuecollege.edu/programs/degrees/proftech/";
    
    // const degrees = await getDegrees(regex, url);

    // let array = [];
    // for (let i = degrees.length - 4; i >= 0; i -= 4) {
    //     array.unshift(degrees[i]);
    // }

    const regex = /Professional[\s\S]*Bacc/g;
    const regex2 = /154">(.*?)(?:<\/a>|,)/g;

    return await getDegrees(regex, regex2);
}

getCertificateDegrees = async () => {
    // const regex = /B\.[AS]\.\sin (.+)<\/h3>/g;
    // const url = "https://www.bellevuecollege.edu/programs/degrees/bachelor/eastern/";
    
    // return await getDegrees(regex, url);
    const regex = /54">(.* Certificate of (?:Accomplishment|Achievement|Completion))/g;
    
    return await getDegrees2(regex);
}

getTransferDegrees = async () => {
    // const regex = /<h2>.*(Associate.*)\(/g;
    const regex = /Transfer Associate[\s\S]*Non/g;
    const regex2 = /154">(.*), /g;
    // const url = "https://www.bellevuecollege.edu/programs/degrees/transfer/";

    return await getDegrees(regex, regex2);

}

getNonTransferDegrees = async () => {
    // const regex = /<a href=\"https:\/\/www.bellevuecollege.edu\/programs\/degrees\/nontransfer.*>(.*)<\/a><\/li>/g;
    // const url = "https://www.bellevuecollege.edu/programs/degrees/nontransfer/";
    const regex = /Non-Transfer[\s\S]*Professional/g;
    const regex2 = /154">(.*), A/g;

    return await getDegrees(regex, regex2);
}

getDegrees2 = async (regex) => {
    console.log("Hello");
    const res = await fetch("https://catalog.bellevuecollege.edu/content.php?navoid=154", {rejectUnauthorized: false});
    console.log("HI2");
    const data = await res.text();

    let array = [];

    while ((match = regex.exec(data))) {
        match.shift();
        match.forEach((s) => {
            array.push(s);
        })
    }

    return array;
}

getDegrees = async (regex, regex2) => {
    const res = await fetch("https://catalog.bellevuecollege.edu/content.php?navoid=154", {rejectUnauthorized: false});
    const data = await res.text();

    let array = [];

    data2 = regex.exec(data);
    while ((match = regex2.exec(data2))) {
        match.shift();
        match.forEach((s) => {
            array.push(s);
        })
    }

    return array;
}

// getDegrees = async (regex, url) => {
//     const res = await fetch(url);
//     const data = await res.text();

//     let array = [];

//     while ((match = regex.exec(data))) {
//         match.shift();
//         match.forEach((s) => {
//             array.push(s);
//         })
//     }

//     return array;
// }