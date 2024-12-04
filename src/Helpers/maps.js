
module.exports.cardinal4 = [[0, -1], [-1, 0], [1, 0], [0, 1]];

module.exports.xDirs = [[1, -1], [-1, 1], [1, 1], [-1, -1]];

module.exports.cardinal8 = [[0, -1], [-1, 0], [1, 0], [0, 1], [-1, 1], [-1, -1], [1, 1], [1, -1]];

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