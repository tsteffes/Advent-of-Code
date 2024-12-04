class Puzzle {
  constructor(year, day, parser = null, solver = null, configs = [], separator = '\r\n') {
    this.year = year;
    this.day = day;
    this.parser = parser;
    this.solver = solver;
    this.configs = configs;
    this.reader = i => io.readLines(i, separator);
  }

  logResult(test, results) {
    results.forEach((r, i) => {
      console.log(`Part ${i + 1} ${test ? 'test ' : ''}solution: ${r}`);
    });
  }

  solve() {
    const path = appRoot + `\\src\\Puzzles\\${this.year}\\Day-${this.day.toString().padStart(2, '0')}\\`;
    const testInput = this.reader(path + 'testInput.txt');
    const input = this.reader(path + 'input.txt');
    const conf = [{ part: 1, ...this.configs[0] }, { part: 2, ...this.configs[1] }];

    if (testInput || input) {
      console.log(`${this.year}-${this.day} solutions:`);

      if (testInput) {
        this.logResult(true, conf.map(c => this.solver(this.parser(testInput, c), c)));
      }

      if (input) {
        this.logResult(false, conf.map(c => this.solver(this.parser(input, c), c)));
      }

      console.log();
    }
  };
}

module.exports = Puzzle;