const fs = require('file-system');
const _ = require('lodash');

const year = process.argv[2] || 2023;
const day = process.argv[3];

let days;
if (day) {
  days = [day];
}
else {
  days = _.range(1, 26);
}

for (const d of days.map(v => v.toString().padStart(2, '0'))) {
  const file = `./src/Puzzles/${year}/Day-${d}/solution.js`;
  if (!fs.existsSync(file)) {
    fs.writeFileSync(file, fs.readFileSync('./src/Helpers/template.js'));
  }

  try {
    require(file);
  }
  catch (error) {
    console.log(`Error on puzzle ${year}-${d}: ${error}`);
  }
}
