const log = (test, results) => results.forEach((r, i) => {
  console.log(`Part ${i + 1} ${test ? 'test ' : ''}solution: ${r}`);
});

exports.solve = (inputter, mapper, method, configs = []) => {
  const path = Object.values(require.cache).filter((m) => m.children.includes(module))[0].path;
  const testInput = inputter(path + '\\testInput.txt');
  const input = inputter(path + '\\input.txt');
  configs = [{ part: 1, ...configs[0] }, { part: 2, ...configs[1] }];
  log(true, configs.map(c => method(mapper(testInput, c), c)));
  log(false, configs.map(c => method(mapper(input, c), c)));
};
