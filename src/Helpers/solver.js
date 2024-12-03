require('./global');
const getCallerFile = require('get-caller-file');

const logResult = (test, results) => results.forEach((r, i) => {
  console.log(`Part ${i + 1} ${test ? 'test ' : ''}solution: ${r}`);
});

// this method must be called from within a solution.js file
exports.solve = (parser, method, configs = [], reader = io.readLines) => {
  const file = getCallerFile();
  const year = file.match(/.*\\(?<y>.*)\\Day-.*\\.*/).groups.y;
  const day = file.match(/.*\\Day-(?<d>.*)\\.*/).groups.d;
  const path = file.match(/(?<f>.*)solution\.js/).groups.f;
  const testInput = reader(path + 'testInput.txt');
  const input = reader(path + 'input.txt');
  configs = [{ part: 1, ...configs[0] }, { part: 2, ...configs[1] }];

  if (testInput || input) {
    console.log(`${year}-${day} solutions:`);

    if (testInput) {
      logResult(true, configs.map(conf => method(parser(testInput, conf), conf)));
    }

    if (input) {
      logResult(false, configs.map(conf => method(parser(input, conf), conf)));
    }

    console.log();
  }
};
