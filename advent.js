const fs = require('file-system');
let file = `./src/Puzzles/${process.argv[2]}/Day-${process.argv[3]}/solution.js`;
if (!fs.existsSync(file)) {
  let template = fs.readFileSync('./src/Helpers/template.js');
  fs.writeFileSync(file, template);
}

require(file);
