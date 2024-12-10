const parseInput = input => {
  return input.map(y => y.split('').map(v => parseInt(v, 10)));
};

let incrementNeighbors = (values, x, y) => {
  for (let dir of maps.cardinal8) {
    let a = x + dir[0], b = y + dir[1];
    if (values.isInBounds([a, b]) && values[b][a] > -1) {
      values[b][a]++;
    }
  }
};

const getSolution = (values, config) => {
  let res = 0;
  let step = 0;
  while(true) {
    step++;
    let stepFlashes = 0;
    for (let x = 0; x < 10; x++) {
      for (let y = 0; y < 10; y++) {
        values[y][x]++;
      }
    }

    let flashed;
    do {
      flashed = false;
      for (let x = 0; x < 10; x++) {
        for (let y = 0; y < 10; y++) {
          if (values[y][x] > 9) {
            res++;
            stepFlashes++;
            flashed = true;
            values[y][x] = -1;
            incrementNeighbors(values, x, y);
          }
        }
      }
    } while(flashed);

    for (let x = 0; x < 10; x++) {
      for (let y = 0; y < 10; y++) {
        if (values[y][x] === -1) {
          values[y][x] = 0;
        }
      }
    }

    if (config.part === 1 && step === 100) {
      break;
    }

    if (config.part === 2 && stepFlashes === 100) {
      return step;
    }
  }

  return res;
};

Solver.solve(parseInput, getSolution);

// Part 1 solution: 1634
// Part 2 solution: 210
