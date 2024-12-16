// returns the cross product of an array
Array.prototype.crossProduct = function() {
  return this.flatMap(v1 => this.map(v2 => [v1, v2]));
}

// returns a new array with the item at the index removed
Array.prototype.removeAt = function(i) {
  return _.concat(this.slice(0, i), this.slice(i + 1));
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

Array.prototype.getUniquePairs = function() {
  let result = [];
  for (let i = 0; i < this.length - 1; i++) {
    for (let j = i + 1; j < this.length; j++) {
      result.push([this[i], this[j]]);
    }
  }

  return result;
}

Array.prototype.pushIf = function(el, pred = v => v)  {
  if (pred(el)) {
    this.push(el);
  }
}

Array.prototype.findAllIndexes = function(pred) {
  let res = [];
  for (let i = 0; i < this.length; i++) {
    if (pred(this[i])) {
      res.push(i);
    }
  }

  return res;
}
