const https = require('https');
const path = require('path');
const URL = require('url');
const fs = require('fs');

exports.getBCRegex = (url, regex, callback) => {
    console.log(url);
    this.getBC(url, (data) => {
        let array = [];
        while ((match = regex.exec(data))) {
            match.shift(); // shift out match[0], only groups left
            match.forEach((s) => {
                array.push(decodeHtmlEntity(s));
            })
        }
        callback(array);
    })
};

exports.getBC = (path, callback) => {
    this.get('https://www.bellevuecollege.edu' + path, (data) => {
        callback(data);
    });
}

// hopefully no one's regex is relying on Html entitys or this will have to be pushed farther down the line
function decodeHtmlEntity(str) {
    return str.replace(/&#(\d+);/g, function(match, dec) {
      return String.fromCharCode(dec);
    });
};




// needs additional error handling for 404's, malformed webpages, etc.
/*
exports.getBC = (path, callback) => {
    console.log('https://www.bellevuecollege.edu' + path)
    let filePath = './cache' + path; // needs to write to /tmp on lambda
    if (filePath.slice(-1) == '/') {
        filePath += 'index.html'
    }
    console.log(filePath);
    fs.access(filePath, fs.constants.R_OK | fs.constants.W_OK, (err) => {
        if (err) {
            this.get('https://www.bellevuecollege.edu' + path, (data) => {
                callback(data);

                let dirs = filePath.split('/');
                dirs.shift();
                dirs.pop();

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
*/

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