require('../../../Helpers/global');

const configs = [{ blinks: 25 }, { blinks: 75 }];
let state;
const parser = i => i[0].split(' ');
const updateState = (val, blink, num) => {
  state.stoneHash[val] = state.stoneHash[val] || { blinks: {} };
  state.stoneHash[val].blinks[blink] = (state.stoneHash[val].blinks[blink] || 0) + num;
  state.blinkHash[blink] = state.blinkHash[blink] || { vals: {} };
  state.blinkHash[blink].vals[val] = (state.blinkHash[blink].vals[val] || 0) + num;
};
const doBlink = (val, blink, num) => {
  vals = [];
  if (val === 0) {
    vals.push(1);
  }
  else if (val.toString().length % 2 === 0)
  {
    let v = val.toString();
    vals.push(parseInt(v.slice(0, v.length / 2), 10));
    vals.push(parseInt(v.slice(v.length / 2), 10));
  }
  else {
    vals.push(val * 2024);
  }

  vals.forEach(val => updateState(val, blink, num));
};
const solver = (input, config) => {
  state = { stoneHash: {}, blinkHash: {} };
  input.forEach(v => updateState(parseInt(v, 10), 0, 1));
  for (let blink = 0; blink < config.blinks; blink++) {
    Object.keys(state.blinkHash[blink].vals)
      .map(v => parseInt(v))
      .forEach(val => {
        doBlink(val, blink + 1, state.stoneHash[val].blinks[blink]);
      });
  }

  return _.sum(Object.entries(state.blinkHash[config.blinks].vals).map(([key, val]) => val))
};
new Puzzle(2024, 11)
  .withParser(parser)
  .withSolver(solver)
  .solve(configs);

// Part 1 solution: 189167
// Part 2 solution: 225253278506288
