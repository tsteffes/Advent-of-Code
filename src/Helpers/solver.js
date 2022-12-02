const logger = require('./logger');

exports.Solver = class {
  constructor(year, day, inputter, mapper, method, configs = []) {
    this.fileName = `src/Puzzles/${year}/Day-${day < 10 ? '0' : ''}${day}/input.txt`;
    this.mapper = mapper;
    this.inputter = inputter;
    this.day = day;
    this.method = method;
    this.configs = [{ ...configs[0], part: 1 }, { ...configs[1], part: 2 }];
  }

  solve = () => {
    logger.log(this.day, this.configs.map(c => this.method(this.mapper(this.inputter(this.fileName), c), c)));
  };
};
