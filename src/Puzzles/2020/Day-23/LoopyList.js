
exports.LoopyList = class {
  constructor(input) {
    let refs = {};
    input.forEach(i => {
      let newVal = { val: i, next: null };
      if (this.current) this.current.next = newVal;
      this.current = newVal;
      refs[i] = newVal;
    });

    this.current.next = refs[input[0]];
    this.current = refs[input[0]];

    input.forEach(i => {
      let cur = refs[i];
      cur.child = refs[i === 1 ? input.length : i - 1];
    });
  }

  find = v => {
    let res = this.current;
    do {
      res = res.next;
    } while (res.val !== v);

    return res;
  };
  setCurrent = v => {
    do {
      this.current = this.current.next;
    } while (this.current.val !== v);
  };
  setDest = (vals) => {
    this.dest = this.current;
    do {
      this.dest = this.dest.child;
    } while (_.some(vals, v => v === this.dest));
  };
  setNext = () => {
    this.current = this.current.next;
  };
  splice = vals => {
    let next = this.dest.next;
    vals.forEach(v => {
      this.dest.next = v;
      this.dest = v;
    });

    this.dest.next = next;
  };
  slice = count => {
    let result = [];
    for (let i = 0; i < count; i++) {
      let next = this.current.next;
      result.push(next);
      this.current.next = next.next;
    }

    return result;
  };
  getState = () => {
    let cur = this.find(1);
    let s = '';
    do {
      s += cur.val;
      cur = cur.next;
    } while (cur.val != 1);

    return s;
  };
};
