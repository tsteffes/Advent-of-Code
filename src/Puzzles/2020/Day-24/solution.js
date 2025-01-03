const moves = { 'e': [2, 0], 'se': [1, -1], 'sw': [-1, -1], 'w': [-2, 0], 'nw': [-1, 1], 'ne': [1, 1] };

const parseInput = input => {
  return input.map(i => {
    let m, res = [];
    while (m = i.match(/(e|se|sw|w|nw|ne)/)) {
      i = i.replace(m[0], '');
      res.push(m[0]);
    }

    return res;
  });
};

let takeStep = (prev, cur) => [prev[0] + moves[cur][0], prev[1] + moves[cur][1]];
let getNeighbors = loc => Object.values(moves).map(v => [loc[0] + v[0], loc[1] + v[1]]);

const getSolution = (input, config) => {
  let result = input.map(i => i.reduce(takeStep, [0, 0]));
  result = result.filter(r => (result.filter(t => maps.isSameLocation(r, t)).length % 2) === 1);
  if (config.part === 2) {
    for (let i = 0; i < config.days; i++) {
      let neighbors = [];
      result.forEach(r => neighbors.push(...getNeighbors(r)));
      let counts = _.countBy(neighbors);
      let allTiles = result.concat(neighbors).uniqueLocations();
      result = allTiles.filter(t => _.some(result, r => maps.isSameLocation(r, t)) ? counts[t] > 0 && counts[t] <= 2 : counts[t] === 2);
    }
  }

  return result.length;
};

Solver.solve(parseInput, getSolution, [{ }, { days: 100 }]);

// Part 1 solution: 427
// Part 2 solution: 3837
