'use strict';

var database = [];

var addOne = function addOne(entry) {
  var id = Math.floor(Math.random() * 100);
  entry.id = id;
  return database.push(entry);
};

var getAll = function getAll() {
  return database;
};

var getOne = function getOne(id) {
  // database.find(entry => entry.id === id);
  for (var i = 0; i < database.length; i++) {
    if (database[i].id === id) {
      return database[i];
    }
  }
  return 'Entry not found';
};

var modifyOne = function modifyOne(entry) {
  for (var i = 0; i < database.length; i++) {
    if (database[i].id === entry.id) {
      database[i].title = entry.title;
      database[i].body = entry.body;
      return database[i];
    }
  }
  return 'Entry not found';
};

var deleteOne = function deleteOne(id) {
  for (var i = 0; i < database.length; i++) {
    if (database[i].id === id) {
      return database.splice(i, 1);
    }
  }
  return 'Entry not found';
};

module.exports = {
  database: database,
  addOne: addOne,
  getAll: getAll,
  getOne: getOne,
  modifyOne: modifyOne,
  deleteOne: deleteOne
};
//# sourceMappingURL=db.js.map