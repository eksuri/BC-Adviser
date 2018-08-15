const fetch = require('node-fetch');

exports.getScholarships = async () => {
    const res = await fetch("https://www.bellevuecollege.edu/foundation/scholarships/listing/");
    const data = await res.text();

    const regex = /<h4(?: style="text-align: left")?>(.+)<\/h4>/g;

    let scholarships = [];
    while ((match = regex.exec(data))) {
        scholarships.push(match[1]);
    }

    return scholarships;
};

