const parseInput = input => {
  return input.map(y => y.split(''));
};

let countOccupiedNeighbors = (values, loc, config) => {
  let neighbors = 0;
  for (let dir of maps.cardinal8) {
    let newLoc = loc.getNeighbor(dir);
    if (config.adjacentRule === 2) {
      while (values.isInBounds(newLoc) && values.getAt(newLoc) === '.') {
        newLoc = newLoc.getNeighbor(dir);
      };
    }

    neighbors += values.isInBounds(newLoc) && values.getAt(newLoc) === '#' ? 1 : 0;
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
      let cur = curState.getAt([x, y]);
      let neighbors = countOccupiedNeighbors(curState, [x, y], config);
      row.push(cur === '.' ? '.' :
        cur === 'L' && neighbors == 0 ? '#' :
        cur === '#' && neighbors >= config.adjacentMin ? 'L' :
        cur);
    }
  }

  return nextState;
};

const getSolution = (values, config) => {
  let nextState = values, curState;
  do {
    curState = nextState;
    nextState = getNextState(curState, config);
  } while (!compareState(curState, nextState))

  return _.sum(curState.map(c => c.filter(c1 => c1 === '#').length));
};

Solver.solve(parseInput, getSolution, [{ adjacentMin: 4, adjacentRule: 1 }, { adjacentMin: 5, adjacentRule: 2 }]);

// Part 1 solution: 2418
// Part 2 solution: 2144
