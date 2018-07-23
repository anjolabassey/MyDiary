const database = [];

const addOne = (entry) => {
  const id = Math.floor(Math.random() * 100);
  entry.id = id;
  return database.push(entry);
};

const getAll = () => {
  return database;
};

const getOne = (id) => {
  // database.find(entry => entry.id === id);
  for (let i = 0; i < database.length; i++) {
    if (database[i].id === id) {
      return database[i];
    }
  }
  return 'Entry not found';
};

const modifyOne = (entry) => {
  for (let i = 0; i < database.length; i++) {
    if (database[i].id === entry.id) {
      database[i].title = entry.title;
      database[i].body = entry.body;
      return database[i];
    }
  }
  return 'Entry not found';
};

const deleteOne = (id) => {
  for (let i = 0; i < database.length; i++) {
    if (database[i].id === id) {
      return database.splice(i, 1);
    }
  }
  return 'Entry not found';
};

module.exports = {
  database,
  addOne,
  getAll,
  getOne,
  modifyOne,
  deleteOne
};