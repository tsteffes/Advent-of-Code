const logger = require('./logger');

class Solver {
  constructor(day, inputter, method, configs) {
    let fileName = `src/Puzzles/Day-${day}/input.txt`;
    this.day = day;
    this.input = inputter(fileName);
    this.method = method;
    this.configs = configs;
  }

  solve = () => {
    logger.log(this.day, this.configs.map(c => this.method(this.input, c)));
  };
}

exports.Solver = Solver;
