exports.HashMap = class {
  constructor(bucketCount) {
    this.buckets = [];
    for (var i = 0; i < bucketCount; i++) {
      this.buckets.push({});
    }
  }

  hash = k => k % this.buckets.length;
  set = (k, v) => this.buckets[this.hash(k)][k] = v;
  get = k => this.buckets[this.hash(k)][k];
};
