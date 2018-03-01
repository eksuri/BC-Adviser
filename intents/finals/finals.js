const finals = require('../../common/finals');

exports.getDates = (callback) => {
    const date = new Date();
    const month = date.getMonth();

    finals.getDates(month, callback)
}
