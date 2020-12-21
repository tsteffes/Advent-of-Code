const _ = require('lodash');
const io = require('../../Helpers/io');
const Solver = require('../../Helpers/solver').Solver;

let getValues = input => {
  return {
    earliest: parseInt(input[0]),
    schedule: _.filter(_.map(input[1].split(','), (v, i) => { return { interval: parseInt(v == 'x' ? -1 : v), index: i }; }), v => v.interval > 0)
  };
};

let getSolution = (input, config, part) => {
  let schedule = input.schedule;
  if (part === 1) {
    schedule.forEach(v => v.wait = v.interval - (input.earliest % v.interval));
    return (v => v.wait * v.interval)(_.sortBy(schedule, v => v.wait)[0]);
  }

  let interval = schedule[0].interval;
  for (let s of schedule) {
    s.multiple = 1;
    while (!((((interval * s.multiple) + s.index) % s.interval) === 0)) {
      s.multiple++;
    }
  }

  for (let i = 0; i < schedule.length; i++) {

  }

  return 0;

  // const gcd = (a, b) => a ? gcd(b % a, a) : b;
  // const lcm = (a, b) => a * b / gcd(a, b);
  // console.log([7, 13, 59, 31, 19].reduce(lcm));
  // let l = schedule.map(s => s.multiple).reduce(lcm);
  // let t = schedule[0].interval * l;
  // schedule.forEach(s => {
  //   console.log(s);
  //   console.log((t + s.index) % s.interval);
  //   console.log();
  // })
  // return schedule[0].interval * l;
};

new Solver(13, io.readLines, getValues, getSolution, [{ }, { }]).solve();

// Part 1 solution:
// Part 2 solution:
