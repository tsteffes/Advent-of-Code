// returns the cross product of an array
Array.prototype.crossProduct = function() {
  return this.flatMap(v1 => this.map(v2 => [v1, v2]));
}

// returns a new array with the item at the index removed
Array.prototype.removeAt = function(i) {
  return _.concat(this.slice(0, i), this.slice(i + 1));
}

// counts the array elements that meet the predicate
Array.prototype.count = function(pred) {
  return _.filter(this, pred).length;
}

Array.prototype.equals = function(other) {
  if (this.length !== other.length) {
    return false;
  }

  for (let i = 0; i < this.length; i++) {
    if (this[i] !== other[i]) {
      return false;
    }
  }

  return true;
}
