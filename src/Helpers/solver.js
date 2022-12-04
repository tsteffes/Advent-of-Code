const logger = require('./logger');

exports.Solver = class {
  constructor(inputter, mapper, method, configs = []) {
    const folder = process.argv[1].match(/(?<folder>.*)solution\.js/).groups.folder;
    configs = [{ part: 1, ...configs[0] }, { part: 2, ...configs[1] }];
    this.solve = () => logger.log(configs.map(c => method(mapper(inputter(folder + 'input.txt'), c), c)));
  }
};
