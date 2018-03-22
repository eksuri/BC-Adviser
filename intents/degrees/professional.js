const https = require('https');





exports.getDegrees = (cb) => {
    // console.log("test");

    const regex = /<td>(.*)<\/td>/g;
    const regex2 = /.*>(.*)<\/a>/g;

    https.get('https://www.bellevuecollege.edu/programs/degrees/proftech/', (res) => {
        let data = '';

        res.on('data', (d) => {
            // process.stdout.write(d);
            data += d.toString();
            // console.log(data);
        }).on('end', (e) => {
            let array = [];
            while ((match = regex.exec(data))) {
                match.shift();
                match.forEach((s) => {
                    array.push(s);
                    //   console.log(s);
                })
            }


            let array2 = [];
            for (let number = 0; number < array.length; number = number + 4)
            {
                if (match = regex2.exec(array[number]))
                    {
                        match.shift();
                        match.forEach((u) => {
                            array2.push(u);
                        })
                    }
            }
            cb(array2);
        })

    }).on('error', (e) => {
        console.error(e);
    });
} 