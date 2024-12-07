
exports.cardinal4 = [[0, -1], [-1, 0], [1, 0], [0, 1]];

exports.xDirs = [[1, -1], [-1, 1], [1, 1], [-1, -1]];

exports.cardinal8 = [[0, -1], [-1, 0], [1, 0], [0, 1], [-1, 1], [-1, -1], [1, 1], [1, -1]];

Array.prototype.getAllCoordinates = function() {
  let coords = [];
  for (let y = 0; y < this.length; y++) {
    for (let x = 0; x < this[0].length; x++) {
      coords.push([x, y]);
    }
  }

  return coords;
};

Array.prototype.isInBounds = function(x, y) {
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
