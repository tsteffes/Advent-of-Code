const reg = /Blueprint (?<idx>\d+): Each ore robot costs (?<oreOre>\d+) ore. Each clay robot costs (?<clayOre>\d+) ore. Each obsidian robot costs (?<obsOre>\d+) ore and (?<obsClay>\d+) clay. Each geode robot costs (?<geoOre>\d+) ore and (?<geoObs>\d+) obsidian./;
const getValues = input => {
  return input.map(m => {
    let res = m.match(reg).groups;
    ['oreOre', 'clayOre', 'obsOre', 'obsClay', 'geoOre', 'geoObs'].forEach(m => res[m] = parseInt(res[m]));
    return res;
  });
};

const statesMatch = (s1, s2) => {
  return s1.mins === s2.mins &&
    s1.ore === s2.ore &&
    s1.clay === s2.clay &&
    s1.geo === s2.geo &&
    s1.obs === s2.obs &&
    s1.obsBots === s2.obsBots &&
    s1.geoBots === s2.geoBots &&
    s1.clayBots === s2.clayBots &&
    s1.oreBots === s2.oreBots;
};

const getMaxPoints = (bp, state) => {
  state.mins--;
  ['ore', 'clay', 'obs', 'geo'].forEach(m => state[m] += state[m + 'Bots']);

  if (state.mins < 1) {
    return state.geo;
  }

  const geoBuys = Math.floor(Math.min(state.ore / bp.geoOre, state.obs / bp.geoObs));
  if (geoBuys > 0) {
    state.geoBots += geoBuys;
    state.ore -= geoBuys * bp.geoOre;
    state.obs -= geoBuys * bp.geoObs;
  }

  let states = [state];

  let newStates = [];
  for (let s of states) {
    const maxObsBuys = Math.floor(Math.min(s.ore / bp.obsOre, s.clay / bp.obsClay));
    for (let i = 1; i <= maxObsBuys; i++) {
      let newState = _.cloneDeep(s);
      newState.obsBots += i;
      newState.ore -= i * bp.obsOre;
      newState.clay -= i * bp.obsClay;
      newStates.push(newState);
    }
  }

  states = states.concat(...newStates);

  newStates = [];
  for (let s of states.filter(s => !s.clayMaxed)) {
    const maxClayBuys = Math.floor(s.ore / bp.clayOre);
    for (let i = 1; i <= maxClayBuys; i++) {
      let newState = _.cloneDeep(s);
      newState.clayBots += i;
      newState.ore -= i * bp.clayOre;
      newState.clayMaxed = i < maxClayBuys;
      newStates.push(newState);
    }
  }

  states = states.concat(...newStates);

  newStates = [];
  for (let s of states.filter(s => !s.oreMaxed)) {
    const maxOreBuys = Math.floor(s.ore / bp.oreOre);
    for (let i = 1; i <= maxOreBuys; i++) {
      let newState = _.cloneDeep(s);
      newState.oreBots += i;
      newState.ore -= i * bp.oreOre;
      newState.oreMaxed = i < maxOreBuys;
      newStates.push(newState);
    }
  }

  states = states.concat(...newStates);
  return _.max(states.map(s => getMaxPoints(bp, s)));
};
const getSolution = (blueprints, config) => {
  if (config.part === 2) return;
  return _.sum(blueprints.map(bp => {
    let state = { mins: config.mins, ore: 0, oreBots: 1, clay: 0, clayBots: 0, obs: 0, obsBots: 0, geo: 0, geoBots: 0 };
    return bp.idx * getMaxPoints(bp, state, { max: 0 });
  }));
};

const config = [{ mins: 12 }, { mins: 24 }];
Solver.solve(io.readLines, getValues, getSolution, config);

// Part 1 solution:
// Part 2 solution:
