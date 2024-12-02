const getCallerFile = require('get-caller-file');

const log = (test, results) => results.forEach((r, i) => {
  console.log(`Part ${i + 1} ${test ? 'test ' : ''}solution: ${r}`);
});

// this method must be called from within a solution.js file
exports.solve = (inputter, mapper, method, configs = []) => {
  const file = getCallerFile();
  const year = file.match(/.*\\(?<y>.*)\\Day-.*\\.*/).groups.y;
  const day = file.match(/.*\\Day-(?<d>.*)\\.*/).groups.d;
  const path = file.match(/(?<f>.*)solution\.js/).groups.f;
  const testInput = inputter(path + 'testInput.txt');
  const input = inputter(path + 'input.txt');
  configs = [{ part: 1, ...configs[0] }, { part: 2, ...configs[1] }];

  if (testInput || input) {
    console.log(`${year}-${day} solutions:`);

    if (testInput) {
      log(true, configs.map(c => method(mapper(testInput, c), c)));
    }

    if (input) {
      log(false, configs.map(c => method(mapper(input, c), c)));
    }

    console.log();
  }
};
