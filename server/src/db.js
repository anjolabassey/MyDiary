const database = [];

const addOne = (entry) => {
  const id = Math.floor(Math.random() * 100);
  entry.id = id;
  return database.push(entry);
};


const viewAll = () => {

};


const viewOne = (id) => {
};

const modifyOne = (id) => {
};

const deleteOne = (id) => {
 
};

module.exports = {
  database,
  addOne,
  viewAll,
  viewOne,
  modifyOne,
  deleteOne
};