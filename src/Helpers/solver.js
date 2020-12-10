const logger = require('./logger');

class Solver {
  constructor(day, inputter, mapper, method, configs) {
    let fileName = `src/Puzzles/Day-${day < 10 ? '0' : ''}${day}/input.txt`;
    this.day = day;
    this.values = mapper(inputter(fileName));
    this.method = method;
    this.configs = configs;
  }

  solve = () => {
    logger.log(this.day, this.configs.map((c, i) => this.method(this.values, c, i + 1)));
  };
}

exports.Solver = Solver;
