const parseInput = input => {
  let res = _.map(input, i => i.match(/(?<op>\w+)\s(?<num>[\-\+\d]+)/).groups);
  res.forEach(j => j.num = parseInt(j.num));
  return res;
}

let execute = (values, state) => {
  let op = values[state.nextIndex];
  state.visited.push(state.nextIndex);
  state.sum += op.op === 'acc' ? op.num : 0;
  state.nextIndex += op.op === 'jmp' ? op.num : 1;
  if (state.nextIndex < values.length && !_.includes(state.visited, state.nextIndex)) {
    execute(values, state);
  }
}

const getSolution = (values, config) => {
  if (config.part === 1) {
    let state = { sum: 0, visited: [], nextIndex: 0 };
    execute(values, state);
    return state.sum;
  }

  return _.sum(_.map([...Array(values.length).keys()], a => {
    let op = values[a].op;
    values[a].op = values[a].op === 'jmp' ? 'nop' : values[a].op === 'nop' ? 'jmp' : values[a].op;
    let state = { sum: 0, visited: [], nextIndex: 0 };
    execute(values, state);
    values[a].op = op;
    return state.nextIndex >= values.length ? state.sum : 0;
  }));
};

Solver.solve(parseInput, getSolution);

// Part 1 solution: 1832
// Part 2 solution: 662
