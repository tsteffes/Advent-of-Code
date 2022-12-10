const _ = require('lodash');
const io = require('../../../helpers/io');
const Solver = require('../../../helpers/solver');

const getValues = input => input.map(i => i.match(/(?<op>(addx|noop))\s?(?<val>[-\d]+)?/).groups);
const render = (state) => {
  state.row.push(Math.abs((state.cycle % 40) - state.X) < 2 ? '#' : '.');
  if (state.cycle % 40 === 39) {
    console.log(state.row.join(''));
    state.row = [];
  }
};
const getSolution = (input, config) => {
  const state = { cycle: 0, X: 1, result: 0, row: [] };
  input.forEach(instruction => {
    _.times(instruction.op === 'noop' ? 1 : 2, () => {
      if (config.part === 2) {
        render(state);
      }

      state.cycle++;
      state.result += state.cycle % 40 === 20 ? state.cycle * state.X : 0;
    });

    state.X += parseInt(instruction.val) || 0;
  });

  return state.result;
};

Solver.solve(io.readLines, getValues, getSolution);

// Part 1 solution: 15680
// Part 2 solution: ZFBFHGUP
