require('../../../Helpers/global');

const parser = i => {
  return { types: i[0].split(',').map(v => v.trim()), desired: i[1].split('\r\n') };
};
let state;
const getComboCount = desired => {
  if (state.cache[desired] === undefined) {
    state.cache[desired] = _.sum(state.types.map(t => {
      if (!desired.startsWith(t)) {
        return 0;
      }

      let rem = desired.slice(t.length);
      state.cache[rem] = rem ? getComboCount(rem) : 1;
      return state.cache[rem];
    }));
  }

  return state.cache[desired];
};
const solver = (setup, config) => {
  state = { cache: {}, types: setup.types };
  return _.sum(setup.desired.map(config.alg));
};
new Puzzle(2024, 19)
  .withSeparator('\r\n\r\n')
  .withParser(parser)
  .withSolver(solver)
  .solve([{ alg: d => Math.min(1, getComboCount(d)) }, { alg: d => getComboCount(d) }]);

// Part 1 solution: 330
// Part 2 solution: 950763269786650
