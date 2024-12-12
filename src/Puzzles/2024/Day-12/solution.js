require('../../../Helpers/global');

const Region = class {
  constructor(loc) {
    this.type = loc.type;
    this.locs = [loc];

    let search = [...loc.neighbors.filter(n => n)];
    let searched = [loc];
    while (search.length > 0) {
      let cur = search.shift();
      searched.push(cur);
      if (!this.locs.find(l => maps.isSameLocation(l.coords, cur.coords)) && cur.type === loc.type) {
        this.locs.push(cur);
        search.push(...cur.neighbors.filter(n => {
          return n && !searched.find(s => maps.isSameLocation(s.coords, n.coords));
        }));
      }
    }

    this.locs.forEach(l => l.region = this);
  }

  area = () => this.locs.length;
  perimeter = () => {
    return _.sum(this.locs.map(l => {
      return l.neighbors.filter(n => !n || n.type !== l.type).length;
    }));
  };
  sides = () => {
    return _.sum(maps.cardinal4.map((c, i) => {
      let relevant = this.locs.filter(l => !l.neighbors[i] || l.neighbors[i].region != this);
      relevant = _.groupBy(relevant, r => r.coords[i % 2 === 0 ? 1 : 0]);
      let cardSides = _.sum(Object.keys(relevant).map(r => {
        let idx = i % 2 === 0 ? 0 : 1;
        let locs = _.sortBy(relevant[r], v => v.coords[idx]);
        let sides = 1;
        for (let j = 1; j < locs.length; j++) {
          if (locs[j].coords[idx] > locs[j - 1].coords[idx] + 1) {
            sides++;
          }
        }

        return sides;
      }));

      return cardSides;
    }));
  };
};

const parser = input => {
  const state = { map: [], regions: [] };
  setMap(state, input);
  setNeighbors(state);
  setRegions(state);
  return state;
};
const setMap = (state, input) => {
  for (let y = 0; y < input.length; y++) {
    let row = [];
    state.map.push(row);
    for (let x = 0; x < input.length; x++) {
      row.push({ type: input.getAt([x, y]), coords: [x, y] });
    }
  }
};
const setNeighbors = state => {
  state.map.getAllCoordinates().forEach(loc => {
    state.map.getAt(loc).neighbors = maps.cardinal4.map(c => state.map.getAtOrNull(loc.getNeighbor(c)));
  });
};
const setRegions = state => {
  state.map.getAllCoordinates().forEach(coords => {
    let loc = state.map.getAt(coords);
    if (!loc.region) {
      state.regions.push(new Region(loc));
    }
  });
};
const solver = (state, config) => {
  return _.sum(state.regions.map(config.alg));
};
new Puzzle(2024, 12)
  .withParser(parser)
  .withSolver(solver)
  .solve([{ alg: r => r.area() * r.perimeter() }, { alg: r =>  r.area() * r.sides() }]);

// Part 1 solution: 1467094
// Part 2 solution: 881182
