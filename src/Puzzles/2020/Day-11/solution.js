const _ = require('lodash');
const io = require('../../Helpers/io');
const Solver = require('../../Helpers/solver').Solver;

let getValues = input => {
  return input.map(y => y.split(''));
};

let countOccupiedNeighbors = (values, x, y, config) => {
  let neighbors = 0;
  let dirs = [[-1, -1], [0, -1], [1, -1], [-1, 0], [1, 0], [-1, 1], [0, 1], [1, 1]];
  for (let dir of dirs) {
    let a = x + dir[0], b = y + dir[1];
    let checkBoundaries = (values, x, y) => x >= 0 && y >= 0 && x < values[0].length && y < values.length;
    if (config.adjacentRule === 2) {
      while (checkBoundaries(values, a, b) && values[b][a] === '.') {
        a += dir[0], b += dir[1];
      };
    }

    neighbors += checkBoundaries(values, a, b) && values[b][a] === '#' ? 1 : 0;
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

let getSolution = (values, config, part) => {
  let nextState = values, curState;
  do {
    curState = nextState;
    nextState = getNextState(curState, config);
  } while (!compareState(curState, nextState))

  return _.sum(curState.map(c => _.filter(c, c1 => c1 === '#').length));
};

new Solver(2020, 11, io.readLines, getValues, getSolution, [{ adjacentMin: 4, adjacentRule: 1 }, { adjacentMin: 5, adjacentRule: 2 }]).solve();

// Part 1 solution: 2418
// Part 2 solution: 2144
