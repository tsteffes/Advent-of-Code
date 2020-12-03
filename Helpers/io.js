const fs = require('file-system');

module.exports = {
  readLines: file => fs.readFileSync(file, 'utf8').split('\r\n')
};