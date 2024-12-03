const parseInput = input => {
  const reg = /Valve (?<name>[A-Z]+) has flow rate=(?<rate>\d+); tunnels? leads? to valves? (?<neighbors>.*)/;
  const map = input.map(i => i.match(reg).groups);
  return _.forEach(map, valve => {
    valve.rate = parseInt(valve.rate);
    valve.neighbors = valve.neighbors.split(',').map(p => _.find(map, i => i.name === p.trim()));
  });
};

const getNode = (name, map) => {
  return map.find(m => m.name === name);
};

const getShortestPathLength = (path, dest, map) => {
  let node = getNode(path[path.length - 1], map);
  let res;
  for (let i = 0; i < node.neighbors.length; i++) {
    const neighbor = node.neighbors[i];
    if (path.includes(neighbor.name)) {
      continue;
    }

    let newPath = _.cloneDeep(path);
    newPath.push(neighbor.name);
    if (neighbor.name === dest) {
      res = newPath;
      break;
    }

    let p = getShortestPathLength(newPath, dest, map);
    if (p && (!res || (res && p.length < res.length))) {
      res = p;
    }
  }

  return res;
};

const getMaxPath = (state, nonZeroes, globalMax) => {
  let max = state.score;
  const unvisited = nonZeroes.filter(m => !_.concat(...state.players.map(p => p.path)).includes(m.name));
  let maxPossible = state.score + (state.time * _.sum(unvisited.map(u => u.rate)));
  if (maxPossible < globalMax.max) {
    return max;
  }

  const player = _.find(state.players, p => p.busyUntil >= state.time);
  for (let dest of unvisited) {
    let time = dest.paths.find(p => p.name === player.path[player.path.length - 1]).dist + 1;
    if (time >= state.time) {
      continue;
    }

    let newState = _.cloneDeep(state);
    newState.score += (newState.time - time) * dest.rate;
    newState.players[player.id].busyUntil -= time;
    newState.players[player.id].path.push(dest.name);
    newState.time = _.max(newState.players.map(p => p.busyUntil));
    max = Math.max(max, getMaxPath(newState, nonZeroes, globalMax));
    globalMax.max = Math.max(max, globalMax.max);
  }

  return max;
};

const getSolution = (map, config) => {
  const nonZeroes = map.filter(m => m.name === 'AA' || m.rate > 0);
  nonZeroes.forEach(start => {
    nonZeroes.forEach(dest => {
      const dist = dest.name === start.name ? 0 : getShortestPathLength([start.name], dest.name, map).length - 1;
      (start.paths = start.paths || []).push({ name: dest.name, dist: dist });
    });
  });

  const player1 = { id: 0, path: ['AA'], busyUntil: 30 - config.learningCost };
  const player2 = { id: 1, path: ['AA'], busyUntil: config.part === 1 ? 0 : 30 - config.learningCost };
  const state = { players: [player1, player2], score: 0, time: 30 - config.learningCost };
  return getMaxPath(state, nonZeroes, { max: 0 });
};

const config = [{ learningCost: 0 }, { learningCost: 4 }];
Solver.solve(parseInput, getSolution, config);

// Part 1 solution: 1923
// Part 2 solution: 2594
