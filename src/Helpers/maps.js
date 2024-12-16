
exports.cardinal4 = [[0, -1], [1, 0], [0, 1], [-1, 0]];

exports.xDirs = [[1, -1], [-1, 1], [1, 1], [-1, -1]];

exports.cardinal8 = [[0, -1], [-1, 0], [1, 0], [0, 1], [-1, 1], [-1, -1], [1, 1], [1, -1]];

exports.isSameLocation = (a, b) => a[0] === b[0] && a[1] === b[1];

exports.parse = (input, split = '', mapper = v => v) => {
  return input.map(i => i.split(split).map(mapper));
};

Array.prototype.getNeighbor = function(dir, mult = 1) {
  return [this[0] + (dir[0] * mult), this[1] + (dir[1] * mult)];
};

Array.prototype.getAllCoordinates = function() {
  let coords = [];
  for (let y = 0; y < this.length; y++) {
    for (let x = 0; x < this[0].length; x++) {
      coords.push([x, y]);
    }
  }

  return coords;
};

Array.prototype.isInBounds = function([x, y]) {
  return x >= 0 && y >= 0 && x < this[0].length && y < this.length;
}

Array.prototype.findElement = function(el) {
  for (let y = 0; y < this.length; y++) {
    for (let x = 0; x < this[0].length; x++) {
      if (this[y][x] === el) {
        return [x, y];
      }
    }
  }

  return null;
}

Array.prototype.findElementWhere = function(pred) {
  for (let c of this.getAllCoordinates()) {
    let el = this[c[1]][c[0]];
    if (pred(el)) {
      return el;
    }
  }

  return null;
}

Array.prototype.findAll = function(el) {
  let res = [];
  for (let y = 0; y < this.length; y++) {
    for (let x = 0; x < this[0].length; x++) {
      if (this[y][x] === el) {
        res.push([x, y]);
      }
    }
  }

  return res;
}

Array.prototype.findAllWhere = function(pred) {
  let res = [];
  this.getAllCoordinates().forEach(c => {
    if (pred(this[c[1]][c[0]])) {
      res.push(c);
    }
  });

  return res;
}

Array.prototype.getAt = function([x, y]) {
  return this[y][x];
}

Array.prototype.getAtOrNull = function([x, y]) {
  return this.isInBounds([x, y]) ? this[y][x] : null;
}

Array.prototype.elementHashMap = function() {
  let map = {};
  for (let y = 0; y < this.length; y++) {
    for (let x = 0; x < this[0].length; x++) {
      map[this[y][x]] = map[this[y][x]] || [];
      map[this[y][x]].push([x, y]);
    }
  }

  return map;
}

Array.prototype.uniqueLocations = function() {
  return _.uniqWith(this, maps.isSameLocation);
}
