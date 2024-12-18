const fs = require('file-system');

exports.readLines = (file, separator = '\r\n') => {
  if (!fs.existsSync(file)) {
    fs.writeFileSync(file, '');
  }

  let content = fs.readFileSync(file, 'utf8');
  if (content) {
    if (separator) {
      return content.split(separator);
    }

    return content;
  }

  return null;
};

exports.getFile = (year, day) => {
  const file = `./src/Puzzles/${year}/Day-${day}/solution.js`;
  if (!fs.existsSync(file)) {
    let solution = fs.readFileSync('./src/Helpers/template.js', 'utf8');
    solution = solution.replace('YYYY', parseInt(year)).replace('DD', parseInt(day));
    fs.writeFileSync(file, solution);
  }

  return file;
};

exports.getPath = (year, day) => {
  return appRoot + `\\src\\Puzzles\\${year}\\Day-${day.toString().padStart(2, '0')}\\`;
}
