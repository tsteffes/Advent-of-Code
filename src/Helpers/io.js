const fs = require('file-system');

exports.readLines = (file, separator = '\r\n') => {
  if (!fs.existsSync(file)) {
    fs.writeFileSync(file, '');
  }

  fs.readFileSync(file, 'utf8').split(separator);
};
