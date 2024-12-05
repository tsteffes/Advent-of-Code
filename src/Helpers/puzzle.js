class Puzzle {
  constructor(year, day) {
    this.year = year;
    this.day = day;
    this.parser = i => i;
    this.solver = () => 0;
    this.reader = i => io.readLines(i, '\r\n');
  }

  withSeparator(separator) {
    this.reader = i => io.readLines(i, separator);
    return this;
  }

  withReader(reader) {
    this.reader = reader;
    return this;
  }

  withParser(parser) {
    this.parser = parser;
    return this;
  }

  withSolver(solver) {
    this.solver = solver;
    return this;
  }

  solve(configs = []) {
    const conf = [{ part: 1, ...configs[0] }, { part: 2, ...configs[1] }];
    const logResult = (test, results) => {
      console.log(`${this.year}-${this.day.toString().padStart(2, '0')} ${test ? 'test solutions' : 'solutions'}:`);
      results.forEach((r, i) => console.log(`Part ${i + 1}: ${r}`));
      console.log();
    };
    const execute = test => {
      let input = this.reader(io.getPath(this.year, this.day) + `${test ? 'testInput' : 'input'}.txt`);
      if (input) {
        logResult(test, conf.map(c => this.solver(this.parser(input, c), c)));
      }
    };
    [true, false].forEach(v => execute(v));
  };
}

module.exports = Puzzle;