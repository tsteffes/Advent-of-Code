const log = results => results.forEach((r, i) => {
  console.log(`Part ${i + 1} solution: ${r}`);
});

exports.solve = (inputter, mapper, method, configs = []) => {
  const file = process.argv[1].match(/(?<folder>.*)solution\.js/).groups.folder + 'input.txt';
  configs = [{ part: 1, ...configs[0] }, { part: 2, ...configs[1] }];
  log(configs.map(c => method(mapper(inputter(file), c), c)));
};
