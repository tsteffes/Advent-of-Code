global.fs = require('file-system');
global._ = require('lodash');
global.io = require('./src/Helpers/io');
global.Solver = require('./src/Helpers/solver');

const year = process.argv[2] || (new Date().getFullYear());
const days = process.argv[3] ? [process.argv[3]] : _.range(1, 26);
for (const d of days.map(v => v.toString().padStart(2, '0'))) {
  try {
    require(io.getFile(year, d));
  }
  catch (error) {
    console.log(`Error on puzzle ${year}-${d}: ${error}`);
  }
}
