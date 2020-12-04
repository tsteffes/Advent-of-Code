const fs = require('file-system');

module.exports = {
  readLines: (file, separator = '\r\n') => fs.readFileSync(file, 'utf8').split(separator)
};