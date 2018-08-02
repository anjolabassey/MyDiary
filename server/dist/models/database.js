'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.client = exports.db = undefined;

var _pg = require('pg');

var _pg2 = _interopRequireDefault(_pg);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// process.env.DATABASE_URL ||
require('dotenv').config();

// const connectionString = process.env.CONSTRING;

var client = new _pg2.default.Client(process.env.CONSTRING);

var db = function db() {
  client.connect(function (err) {
    if (err) {
      console.error('connection error', err);
    } else {
      console.log('Connected to the database');
    }
  });
  return client;
};

exports.db = db;
exports.client = client;
//# sourceMappingURL=database.js.map