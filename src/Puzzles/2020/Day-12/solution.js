const parseInput = input => {
  let res = _.map(input, i => i.match(/(?<cmd>[NSEWLRF])(?<val>\d+)/).groups);
  res.forEach(r => r.val = parseInt(r.val));
  return res;
};

getFinalState = (values, part) => {
  let compass = ['N', 'E', 'S', 'W'];
  let state;
  if (part === 1) {
    state = { dir: 1, nextMove: 0, pos: [0, 0] };
    for (let cmd of values) {
      state.dir = cmd.cmd === 'L' ? (state.dir + 4 - (cmd.val / 90)) % 4 :
        cmd.cmd === 'R' ? (state.dir + (cmd.val / 90)) % 4 :
        state.dir;
      state.nextMove = _.includes(compass, cmd.cmd) ? compass.indexOf(cmd.cmd) : state.dir;

      if (!_.includes(['L', 'R'], cmd.cmd)) {
        state.pos = state.nextMove === 0 ? [state.pos[0], state.pos[1] + cmd.val] :
          state.nextMove === 1 ? [state.pos[0] + cmd.val, state.pos[1]] :
          state.nextMove === 2 ? [state.pos[0], state.pos[1] - cmd.val] :
          [state.pos[0] - cmd.val, state.pos[1]];
      }
    }
  }
  else {
    state = { pos: [0, 0], wPos: [10, 1] };
    for (let cmd of values) {
      if (compass.indexOf(cmd.cmd) !== -1) {
        state.wPos = cmd.cmd === 'N' ? [state.wPos[0], state.wPos[1] + cmd.val] :
          cmd.cmd === 'E' ? [state.wPos[0] + cmd.val, state.wPos[1]] :
          cmd.cmd === 'S' ? [state.wPos[0], state.wPos[1] - cmd.val] :
          [state.wPos[0] - cmd.val, state.wPos[1]];
      }
      else if(cmd.cmd == 'F') {
        state.pos = [state.pos[0] + (state.wPos[0] * cmd.val), state.pos[1] + (state.wPos[1] * cmd.val)];
      }
      else {
        let getQuadrant = (x, y) => x > 0 && y > 0 ? 0 : x > 0 ? 1 : x < 0 && y < 0 ? 2 : 3;
        let turn = (cmd.cmd === 'L' ? -1 : 1) * (cmd.val / 90);
        let orig = [state.wPos[0], state.wPos[1]];
        let quad = (getQuadrant(state.wPos[0], state.wPos[1]) + 4 + turn) % 4;
        let signs = [[1, 1], [1, -1], [-1, -1], [-1, 1]];
        state.wPos[0] = signs[quad][0] * Math.abs(orig[Math.abs(turn) == 2 ? 0 : 1]);
        state.wPos[1] = signs[quad][1] * Math.abs(orig[Math.abs(turn) == 2 ? 1 : 0]);
      }
    }
  }

  return state;
};

const getSolution = (values, config) => {
  let finalState = getFinalState(values, config.part);
  return Math.abs(finalState.pos[0]) + Math.abs(finalState.pos[1]);
};

Solver.solve(parseInput, getSolution);

// Part 1 solution: 2270
// Part 2 solution: 138669
