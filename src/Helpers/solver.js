require('./global');
const getCallerFile = require('get-caller-file');

// this method must be called from within a solution.js file
exports.solve = (parser, method, configs = [], separator = '\r\n') => {
  const file = getCallerFile();
  const year = file.match(/.*\\(?<y>.*)\\Day-.*\\.*/).groups.y;
  const day = file.match(/.*\\Day-(?<d>.*)\\.*/).groups.d;
  configs = [{ part: 1, ...configs[0] }, { part: 2, ...configs[1] }];
  new Puzzle(parseInt(year), parseInt(day))
    .withSeparator(separator)
    .withParser(parser)
    .withSolver(method)
    .solve(configs);
};
