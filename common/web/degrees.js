const fetch = require('node-fetch');

exports.list= ["bachelors", "associates", "transfer", "non transfer", "professional", "technical", "eastern Washington"];

exports.getDegrees = async (degree_type) => {
    switch (degree_type) {
        case "bachelors":
            return await getBachelorsDegrees();
        case "professional":
        case "technical":
            return await getProfTechDegrees();
        case "eastern Washington":
            return await getEasternDegrees();
        case "transfer":
            return await getTransferDegrees();
        case "non transfer":
            return await getNonTransferDegrees();
        case "associates":
        default:
            return await Promise.all([
                getTransferDegrees(),
                getNonTransferDegrees()]
            ).then((c) => {return c[0].concat(c[1])});
      }
}


getBachelorsDegrees = async () => {
    const regex = /<a href=\"https:\/\/www.bellevuecollege.edu\/programs\/degrees\/bachelor.*>.*(?:Arts|Science)\s(?:Degree\s)?(.*)<\/a>/g;
    const url = "https://www.bellevuecollege.edu/programs/degrees/bachelor/";
    
    return await getDegrees(regex, url);
}

getProfTechDegrees = async () => {
    const regex = /<td>(?:<a href=.*?>)?(.*?)(?:<\/a>)?<\/td>\s<td>(.*)<\/td>\s<td>(.*)<\/td>\s<td>(?:<a href=.*?>)?(.*?)(?:<\/a>)?<\/td>/g;
    const url = "https://www.bellevuecollege.edu/programs/degrees/proftech/";
    
    const degrees = await getDegrees(regex, url);

    let array = [];
    for (let i = degrees.length - 4; i >= 0; i -= 4) {
        array.unshift(degrees[i]);
    }

    return array;
}

getEasternDegrees = async () => {
    const regex = /B\.[AS]\.\sin (.+)<\/h3>/g;
    const url = "https://www.bellevuecollege.edu/programs/degrees/bachelor/eastern/";
    
    return await getDegrees(regex, url);
}

getTransferDegrees = async () => {
    const regex = /<h2>.*(Associate.*)\(/g;
    const url = "https://www.bellevuecollege.edu/programs/degrees/transfer/";

    return await getDegrees(regex, url);
}

getNonTransferDegrees = async () => {
    const regex = /<a href=\"https:\/\/www.bellevuecollege.edu\/programs\/degrees\/nontransfer.*>(.*)<\/a><\/li>/g;
    const url = "https://www.bellevuecollege.edu/programs/degrees/nontransfer/";

    return await getDegrees(regex, url);
}

getDegrees = async (regex, url) => {
    const res = await fetch(url);
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