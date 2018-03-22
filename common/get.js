const https = require('https');
const path = require('path');
const URL = require('url');
const fs = require('fs');

exports.getBCRegex = (url, regex, callback) => {
    this.getBC(url, (data) => {
        let array = [];
        while ((match = regex.exec(data))) {
            match.shift(); // shift out match[0], only groups left
            match.forEach((s) => {
                array.push(s);
            })
            callback(array);
        }
    })
};

// needs additional error handling for 404's, malformed webpages, etc.

exports.getBC = (path, callback) => {
    let filePath = './cache' + path; // needs to write to /tmp on lambda
    if (filePath.slice(-1) == '/') {
        filePath += 'index.html'
    }
    fs.access(filePath, fs.constants.R_OK | fs.constants.W_OK, (err) => {
        if (err) {
            this.get('https://www.bellevuecollege.edu' + path, (data) => {
                callback(data);

                let dirs = filePath.split('/');
                dirs.shift();

                function checkDirectory(directory, callback) {
                    fs.stat(directory, function (err, stats) {
                        if (err) {
                            fs.mkdir(directory, callback());
                        }
                        else {
                            callback();
                        }
                    });
                }

                function checkAllDirectories(current, dirs) {
                    if(dirs[1] == null) {
                        checkDirectory(current, () => {
                            fs.writeFile(filePath, data, (err));
                        });
                        return;
                    }
                    checkDirectory(current, () => {
                        checkAllDirectories(current + '/' + dirs.shift(), dirs)
                    });
                }
                
                checkAllDirectories(dirs.shift(), dirs);
            })
        } else {
            fs.readFile(filePath, 'utf8', (err, data) => {
                callback(data);
            });
        }
    });
};

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