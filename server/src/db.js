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
  return database.find(entry => entry.id === id);
};

const modifyOne = (entry) => {
  for (let i = 0; i < database.length; i += 1) {
    if (database[i].id === entry.id) {
      database[i].title = entry.title;
      database[i].body = entry.body;
    }
    return database[i];
  }
};

const deleteOne = (id) => {
  for (let i = 0; i < database.length; i += 1) {
    if (database[i].id === id) {
      return database.splice(i, 1);
    }
  }
};

module.exports = {
  database,
  addOne,
  getAll,
  getOne,
  modifyOne,
  deleteOne
};