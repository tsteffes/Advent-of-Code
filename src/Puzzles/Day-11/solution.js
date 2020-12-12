const _ = require('lodash');
const io = require('../../Helpers/io');
const Solver = require('../../Helpers/solver').Solver;

let getValues = input => {
  return input.map(y => y.split(''));
};

let countOccupiedNeighbors = (values, x, y, config) => {
  let neighbors = 0;
  let checkBoundaries = (values, x, y) => x >= 0 && y >= 0 && x < values[0].length && y < values.length;
  if (config.adjacentRule === 1) {
    for (let b = y - 1; b <= y + 1; b++) {
      for (let a = x - 1; a <= x + 1; a++) {
        neighbors += checkBoundaries(values, a, b) && !(b == y && a == x) && values[b][a] === '#' ? 1 : 0;
      }
    }
  }
  else {
    let dirs = [[-1, -1], [0, -1], [1, -1], [-1, 0], [1, 0], [-1, 1], [0, 1], [1, 1]];
    for (let dir of dirs) {
      let a = x, b = y;
      do {
        a += dir[0], b += dir[1];
      } while (checkBoundaries(values, a, b) && values[b][a] === '.');

      neighbors += checkBoundaries(values, a, b) && values[b][a] === '#';
    }
  }

  return neighbors;
};

let compareState = (state, nextState) => {
  return !_.some([...Array(state.length).keys()], i => state[i].join() !== nextState[i].join());
}

let getNextState = (curState, config) => {
  let nextState = [];
  for (let y = 0; y < curState.length; y++) {
    let row = [];
    nextState.push(row);
    for (let x = 0; x < curState[0].length; x++) {
      let cur = curState[y][x];
      let neighbors = countOccupiedNeighbors(curState, x, y, config);
      row.push(cur === '.' ? '.' :
        cur === 'L' && neighbors == 0 ? '#' :
        cur === '#' && neighbors >= config.adjacentMin ? 'L' :
        cur);
    }
  }

  return nextState;
};

let stableStateCount = (state, config) => {
  let nextState = state, curState;
  do {
    curState = nextState;
    nextState = getNextState(curState, config);
  } while (!compareState(curState, nextState))

  return _.sum(curState.map(c => _.filter(c, c1 => c1 === '#').length));
}

let getSolution = (values, config, part) => {
  if (part === 1) {
    return stableStateCount(values, config);
  }

  return stableStateCount(values, config);
};

new Solver(11, io.readLines, getValues, getSolution, [{ adjacentMin: 4, adjacentRule: 1 }, { adjacentMin: 5, adjacentRule: 2 }]).solve();

// Part 1 solution: 2418
// Part 2 solution: 2144
