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
    const path = appRoot + `\\src\\Puzzles\\${this.year}\\Day-${this.day.toString().padStart(2, '0')}\\`;
    const testInput = this.reader(path + 'testInput.txt');
    const input = this.reader(path + 'input.txt');
    const conf = [{ part: 1, ...configs[0] }, { part: 2, ...configs[1] }];
    const logResult = (test, results) => {
      console.log(`${this.year}-${this.day.toString().padStart(2, '0')} ${test ? 'test solutions' : 'solutions'}:`);
      results.forEach((r, i) => console.log(`Part ${i + 1}: ${r}`));
      console.log();
    }

    if (testInput) {
      logResult(true, conf.map(c => this.solver(this.parser(testInput, c), c)));
    }

    if (input) {
      logResult(false, conf.map(c => this.solver(this.parser(input, c), c)));
    }
  };
}

module.exports = Puzzle;