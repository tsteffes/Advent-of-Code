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
