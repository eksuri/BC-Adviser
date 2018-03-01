const https = require('https');

exports.get = (url, callback) => {
    https.get(url, (res) => {
        let data = '';

        res.on('data', (d) => {
            data += d.toString();
        }).on('end', (e) => {
            //console.log(data);
            callback(data)
        });
    }).on('error', (e) => {
        console.error(e);
    });
};