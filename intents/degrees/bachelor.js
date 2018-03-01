const https = require('https');

exports.getDegrees = (cb) => {

    const regex = /<a href=\"https:\/\/www.bellevuecollege.edu\/programs\/degrees\/bachelor.*>.*(?:Arts|Science)\s(?:Degree\s)?(.*)<\/a>/g;

    https.get('https://www.bellevuecollege.edu/programs/degrees/bachelor/', (res) => {
        let data = '';

        res.on('data', (d) => {
            // process.stdout.write(d);
            data += d.toString();
        }).on('end', (e) => {
            let array = [];
            while ((match = regex.exec(data))) {
                match.shift();
                match.forEach((s) => {
                    array.push(s);
                    //   console.log(s);
                })
            }
            cb(array);
        })

    }).on('error', (e) => {
        console.error(e);
    });
} 