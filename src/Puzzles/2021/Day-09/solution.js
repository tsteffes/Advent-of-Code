const parseInput = input => {
  return input.map(y => y.split('').map(v => parseInt(v, 10)));
};

let lowPoint = (values, x, y) => {
  let higherNeighbors = 0;
  let borders = 0;
  for (let dir of maps.cardinal4) {
    let a = x + dir[0], b = y + dir[1];
    if (values.isInBounds([a, b])) {
      borders++;
      if (values[b][a] > values[y][x]) {
        higherNeighbors++;
      }
    }
  }

  return higherNeighbors === borders;
};

let getBasinPoints = (values, loc, visited) => {
  visited.push(loc);
  let res = [loc];
  let checkVisited = (vals, loc) => vals.filter(v => v[0] === loc[0] && v[1] === loc[1]).length > 0;
  for (let dir of maps.cardinal4) {
    let newLoc = loc.getNeighbor(dir)
    if (values.isInBounds(newLoc) && !checkVisited(visited, newLoc)) {
      if (values.getAt(newLoc) !== 9 && values.getAt(newLoc) > values.getAt(loc)) {
        res = res.concat(getBasinPoints(values, newLoc, visited));
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
    basins.push(getBasinPoints(values, lowPoint, []));
  }

  return _.take(basins.sort((a, b) => b.length - a.length), 3).reduce((cur, x) => cur * x.length, 1);
};

Solver.solve(parseInput, getSolution);

// Part 1 solution: 550
// Part 2 solution: 1100682
