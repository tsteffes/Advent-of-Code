const log = (test, results) => results.forEach((r, i) => {
  console.log(`Part ${i + 1} ${test ? 'test ' : ''}solution: ${r}`);
});

exports.solve = (inputter, mapper, method, configs = []) => {
  const path = process.argv[1].match(/(?<f>.*)solution\.js/).groups.f;
  const testInput = inputter(path + 'testInput.txt');
  const input = inputter(path + 'input.txt');
  configs = [{ part: 1, ...configs[0] }, { part: 2, ...configs[1] }];
  log(true, configs.map(c => method(mapper(testInput, c), c)));
  log(false, configs.map(c => method(mapper(input, c), c)));
};
