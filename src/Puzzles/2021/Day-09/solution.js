const parseInput = input => {
  return input.map(y => y.split('').map(v => parseInt(v, 10)));
};

let lowPoint = (values, x, y) => {
  let higherNeighbors = 0;
  let borders = 0;
  let dirs = [[0, -1], [-1, 0], [1, 0], [0, 1]];
  for (let dir of dirs) {
    let a = x + dir[0], b = y + dir[1];
    if (values.isInBounds(a, b)) {
      borders++;
      if (values[b][a] > values[y][x]) {
        higherNeighbors++;
      }
    }
  }

  return higherNeighbors === borders;
};

let getBasinPoints = (values, x, y, visited) => {
  visited.push([x, y]);
  let res = [[x, y]];
  let dirs = [[0, -1], [-1, 0], [1, 0], [0, 1]];
  let checkVisited = (vals, x, y) => vals.filter(v => v[0] === x && v[1] === y).length > 0;
  for (let dir of dirs) {
    let a = x + dir[0], b = y + dir[1];
    if (values.isInBounds(a, b) && !checkVisited(visited, a, b)) {
      if (values[b][a] !== 9 && values[b][a] > values[y][x]) {
        res = res.concat(getBasinPoints(values, a, b, visited));
      }
    }
  }

  return res;
}

const getSolution = (values, config) => {
  let lowPoints = [];
  for (let x = 0; x < values[0].length; x++) {
    for (let y = 0; y < values.length; y++) {
      if (lowPoint(values, x, y)) {
        lowPoints.push([x, y]);
      }
    }
  }

  if (config.part === 1) {
    return _.sum(lowPoints.map(l => 1 + values[l[1]][l[0]]));
  }

  let basins = [];
  for (let lowPoint of lowPoints) {
    basins.push(getBasinPoints(values, lowPoint[0], lowPoint[1], []));
  }

  return _.take(basins.sort((a, b) => b.length - a.length), 3).reduce((cur, x) => cur * x.length, 1);
};

Solver.solve(parseInput, getSolution);

// Part 1 solution: 550
// Part 2 solution: 1100682
