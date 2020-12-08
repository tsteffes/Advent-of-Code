const _ = require('lodash');
const io = require('../../Helpers/io');
const Solver = require('../../Helpers/solver').Solver;

let getValues = input => {
  return _.map(input, i => i.match(/(?<op>\w+)\s(?<sign>[\-\+])(?<num>\d+)/).groups);
}

let execute = (values, index, result) => {
  if (result.visited.indexOf(index) > -1) {
    return;
  }

  result.visited.push(index);

  if (index >= values.length) {
    return;
  }

  let val = values[index].op === 'acc' ? values[index].sign === '-' ? -1 * parseInt(values[index].num) : parseInt(values[index].num) : 0;
  index += values[index].op === 'jmp' ? values[index].sign === '-' ? -1 * parseInt(values[index].num) : parseInt(values[index].num) : 1;
  result.sum += val;
  execute(values, index, result);
}

let getSolution = (values, config, part) => {
  let result = { sum: 0, visited: [] };
  if (part === 1) {
    execute(values, 0, result);
    return result.sum;
  }

  return _.filter([...Array(values.length).keys()].map(a => {
    let originalOp = values[a].op;
    values[a].op = values[a].op === 'jmp' ? 'nop' : values[a].op === 'nop' ? 'jmp' : values[a].op;
    let result = { sum: 0, visited: [] };
    execute(values, 0, result);
    if (result.visited[result.visited.length - 1] >= values.length) {
      return result.sum;
    }

    values[a].op = originalOp;
  }), i => i > -1)[0];
};

new Solver(8, io.readLines, getValues, getSolution, [{ }, { }]).solve();

// Part 1 solution: 1832
// Part 2 solution: 662
