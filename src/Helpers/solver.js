const logger = require('./logger');

exports.Solver = class {
  constructor(inputter, mapper, method, configs = []) {
    this.folder = process.argv[1].match(/(?<folder>.*)solution\.js/).groups.folder;
    this.mapper = mapper;
    this.inputter = inputter;
    this.method = method;
    this.configs = [{ part: 1, ...configs[0] }, { part: 2, ...configs[1] }];
  }

  solve = () => {
    logger.log(this.configs.map(c => this.method(this.mapper(this.inputter(this.folder + 'input.txt'), c), c)));
  };
};
