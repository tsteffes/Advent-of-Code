const _ = require('lodash');
const io = require('../../Helpers/io');
const Solver = require('../../Helpers/solver').Solver;

let getValues = input => input;

let getBlankState = (size) => {
  let state = [];
  for (let w = 0; w < size.w; w++) {
    let hyperPlane = [];
    for (let z = 0; z < size.z; z++) {
      let plane = [];
      for (let y = 0; y < size.y; y++) {
        plane.push(new Array(size.x).fill('.'));
      }

      hyperPlane.push(plane);
    }

    state.push(hyperPlane);
  }

  return state;
};

let getNextState = (c, state) => {
  let n = 0;
  for (let w = -1; w <= 1; w++) {
    for (let z = -1; z <= 1; z++) {
      for (let y = -1; y <= 1; y++) {
        for(let x = -1; x <= 1; x++) {
          let cur = { w: c.w + w, z: c.z + z, y: c.y + y, x: c.x + x };
          if (
            cur.w >= 0 && cur.w < state.length &&
            cur.z >= 0 && cur.z < state[0].length &&
            cur.y >= 0 && cur.y < state[0][0].length &&
            cur.x >= 0 && cur.x < state[0][0][0].length &&
            !(x === 0 && y === 0 && z === 0 && w === 0)) {
            n += state[cur.w][cur.z][cur.y][cur.x] === '#' ? 1 : 0;
          }
        }
      }
    }
  }

  let curVal = state[c.w][c.z][c.y][c.x];
  return curVal === '#' && (n == 2 || n == 3) ? '#' : curVal === '.' && n === 3 ? '#' : '.';
};

let getCubeCount = state => {
  let count = 0;
  for (let w = 0; w < state.length; w++) {
    for (let z = 0; z < state[0].length; z++) {
      for (let y = 0; y < state[0][0].length; y++) {
        for(let x = 0; x < state[0][0][0].length; x++) {
          count += state[w][z][y][x] === '#' ? 1 : 0;
        }
      }
    }
  }

  return count;
};

let getSolution = (input, config, part) => {
  let size = { x: (config.cycles * 2) + input[0].length, y: (config.cycles * 2) + input.length, z: (config.cycles * 2) + 1, w: config.d === 4 ? (config.cycles * 2) + 1 : 1 };
  let state = getBlankState(size);
  for (let y = 0; y < input.length; y++) {
    for (let x = 0; x < input[0].length; x++) {
      state[config.d === 4 ? config.cycles : 0][config.cycles][config.cycles + y][config.cycles + x] = input[y][x];
    }
  }

  for (let i = 0; i < config.cycles; i++) {
    let nextState = getBlankState(size);
    for (let w = 0; w < size.w; w++) {
      for (let z = 0; z < size.z; z++) {
        for (let y = 0; y < size.y; y++) {
          for(let x = 0; x < size.x; x++) {
            nextState[w][z][y][x] = getNextState({ x, y, z, w }, state);
          }
        }
      }
    }

    state = nextState;
  }

  return getCubeCount(state);
};

new Solver(17, io.readLines, getValues, getSolution, [{ cycles: 6, d: 3 }, { cycles: 6, d: 4 }]).solve();

// Part 1 solution: 317
// Part 2 solution: 1692
