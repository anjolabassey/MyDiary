import pg from 'pg';
import startDb from '../models/database';


const database = [
  {
    title: 'I met someone',
    body: 'at the football game',
    id: 100
  }
];

const addOne = (req, res, next) => {
  if (!req.body.title || !req.body.body) {
    res.sendStatus(406);
  } else {
    const id = Math.floor(Math.random() * 100);
    req.body.id = id;
    database.push(req.body);
    res.send({
      message: 'Entry added succesfully'
    });
  }
};


const getAll = (req, res) => {
  // res.send(database);
  client.query('SELECT * FROM entries', (err, res) => {
    if (err) {
      res.send(err);
    } else {
      
    }
  });
};

const getOne = (req, res) => {
  // database.find(entry => entry.id === id);
  const id = Number(req.params.id);
  let result;
  for (let i = 0; i < database.length; i++) {
    if (database[i].id === id) {
      result = database[i];
    }
  }
  if (!result) {
    res.sendStatus(404);
  } else {
    res.send(result);
  }
};

const modifyOne = (req, res) => {
  const id = Number(req.params.id);
  const { title, body } = req.body;
  let result;
  for (let i = 0; i < database.length; i++) {
    if (database[i].id === id) {
      database[i].title = title;
      database[i].body = body;
      result = database[i];
    }
  }
  if (!result) {
    res.sendStatus(404);
  } else {
    res.send(result);
  }
};

const deleteOne = (req, res) => {
  const id = Number(req.params.id);
  let result;
  for (let i = 0; i < database.length; i++) {
    if (database[i].id === id) {
      result = database.splice(i, 1);
    }
  }
  if (!result) {
    res.sendStatus(404);
  } else {
    res.send({
      message: 'Entry successfully deleted'
    });
  }
};

export default {
  database,
  addOne,
  getAll,
  getOne,
  modifyOne,
  deleteOne
};