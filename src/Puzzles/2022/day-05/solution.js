const _ = require('lodash');
const io = require('../../../helpers/io');
const Solver = require('../../../helpers/solver');

const getValues = input => {
  const rows = _.reverse(input[0].split('\r\n'));
  const len = _.ceil(rows[0].length / 4);
  const stacks = [];
  for (let i = 0; i < len; i++) {
    stacks.push([]);
  }

  _.forEach(rows.splice(1), r => {
    for (let i = 0; i < len && (i * 4) <= r.length; i++) {
      const l = r.substring(i * 4, i * 4 + 4).match(/\[(?<letter>[A-Z])\]\s?/);
      if (l) {
        stacks[i].push(l.groups.letter);
      }
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
