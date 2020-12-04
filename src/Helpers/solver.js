const logger = require('./logger');

class Solver {
  constructor(inputter, method, configs) {
    this.input = inputter();
    this.method = method;
    this.configs = configs;
  }

  solve = () => {
    logger.log(this.configs.map(c => this.method(this.input, c)));
  };
}

exports.Solver = Solver;