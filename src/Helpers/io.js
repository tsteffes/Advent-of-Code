const fs = require('file-system');

exports.readLines = (file, separator = '\r\n') => fs.readFileSync(file, 'utf8').split(separator);
