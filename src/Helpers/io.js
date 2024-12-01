exports.readLines = (file, separator = '\r\n') => {
  if (!fs.existsSync(file)) {
    fs.writeFileSync(file, '');
  }

  let content = fs.readFileSync(file, 'utf8');
  if (content) {
    return content.split(separator);
  }

  return null;
};

exports.getFile = (year, day) => {
  const file = `./src/Puzzles/${year}/Day-${day}/solution.js`;
  if (!fs.existsSync(file)) {
    fs.writeFileSync(file, fs.readFileSync('./src/Helpers/template.js'));
  }

  return file;
};
