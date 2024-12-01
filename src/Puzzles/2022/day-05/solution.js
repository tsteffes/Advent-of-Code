const _ = require('lodash');
const io = require('../../../Helpers/io');
const Solver = require('../../../Helpers/solver');

const getValues = input => {
  const rows = _.reverse(input[0].split('\r\n')).splice(1);
  const stacks = [];
  rows.forEach(r => {
    for (let i = 0; (i * 4) <= r.length; i++) {
      const letter = r.substring(i * 4).match(/^\[(?<letter>[A-Z])\]/);
      letter && (stacks[i] = stacks[i] || []).push(letter.groups.letter);
    }
  });

  let moves = _.forEach(input[1].split('\r\n').map(r =>
    r.match(/move (?<count>[\d]+) from (?<from>[\d+]) to (?<to>[\d+])/).groups),
      v => ['count', 'from', 'to'].forEach(x => v[x] = parseInt(v[x])));

  return { stacks, moves };
};

const getSolution = (input, config) => {
  input.moves.forEach(i => {
    let s = [];
    _.times(i.count, () => s.push(input.stacks[i.from - 1].pop()));
    input.stacks[i.to - 1].push(...config.mutate(s));
  });

  return input.stacks.map(s => s[s.length - 1]).join('');
};

const config = [{ mutate: a => a }, { mutate: a => a.reverse() }];
Solver.solve(i => io.readLines(i, '\r\n\r\n'), getValues, getSolution, config);

// Part 1 solution: LJSVLTWQM
// Part 2 solution: BRQWDBBJM
