const https = require('https');

exports.getDegrees = (cb) => {

    const regex = /[B.A.|B.S.]<\/abbr> in (.*)<\/a><\/h3>/g;
    const regex2 = /[B.A.|B.S.]<\/abbr> in (.*\w)<\/h/g;
    https.get('https://www.bellevuecollege.edu/programs/degrees/bachelor/eastern/', (res) => {
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
            while ((match = regex2.exec(data))) {
                match.shift();
                match.forEach((s) => {
                    array.push(s);
                    //   console.log(s);
                })
            }
            console.log("test");
            cb(array);
        })

    }).on('error', (e) => {
        console.error(e);
    });
} 