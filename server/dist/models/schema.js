'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteEntryTable = exports.deleteUserTable = exports.createUserTable = exports.createEntryTable = undefined;

var _database = require('./database');

var createEntryTable = function createEntryTable() {
  _database.client.query('CREATE TABLE IF NOT EXISTS entries (id SERIAL PRIMARY KEY, title CHARACTER VARYING(50) NOT NULL, body CHARACTER VARYING(1000) NOT NULL, created_at TIMESTAMP NOT NULL DEFAULT(NOW()), last_updated TIMESTAMP NOT NULL DEFAULT(NOW()), user_id INT REFERENCES users)', function (err, res) {
    if (err) {
      console.log(err);
    } else {
      console.log('Created entries table succesfully');
    }
  });
};

var createUserTable = function createUserTable() {
  _database.client.query('CREATE TABLE IF NOT EXISTS users (user_id SERIAL PRIMARY KEY, email CHARACTER VARYING(30) UNIQUE NOT NULL, username CHARACTER VARYING(30) NOT NULL, password CHARACTER VARYING(250) NOT NULL)', function (err, res) {
    if (err) {
      console.log(err);
    } else {
      console.log('Created users table succesfully');
    }
  });
};

var deleteUserTable = function deleteUserTable() {
  _database.client.query('DROP TABLE IF EXISTS users CASCADE', function (err, res) {
    if (err) {
      console.log(err);
    } else {
      console.log('Deleted users table succesfully');
    }
  });
};

var deleteEntryTable = function deleteEntryTable() {
  _database.client.query('DROP TABLE IF EXISTS entries CASCADE', function (err, res) {
    if (err) {
      console.log(err);
    } else {
      console.log('Deleted entries table succesfully');
    }
  });
};

exports.createEntryTable = createEntryTable;
exports.createUserTable = createUserTable;
exports.deleteUserTable = deleteUserTable;
exports.deleteEntryTable = deleteEntryTable;
//# sourceMappingURL=schema.js.map