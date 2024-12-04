var path = require('path');

global._ = require('lodash');
global.arrays = require('./arrays');
global.io = require('./io');
global.Solver = require('./solver');
global.maps = require('./maps');
global.Puzzle = require('./puzzle');
global.appRoot = path.resolve( __dirname, '../..');