let _ = require('lodash');

module.exports = {
  getRange: count => _.map([...Array(count).keys()], v => parseInt(v)),
  getCrossProduct: (a, b) => a.flatMap(v1 => b.map(v2 => [v1, v2]))
};
