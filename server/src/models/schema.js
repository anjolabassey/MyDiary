import { db, client } from './database';

const createEntryTable = () => {
  client.query('CREATE TABLE IF NOT EXISTS entries (id SERIAL PRIMARY KEY, title CHARACTER VARYING(50) NOT NULL, body CHARACTER VARYING(1000) NOT NULL, created_at TIMESTAMP NOT NULL DEFAULT(NOW()), last_updated TIMESTAMP NOT NULL DEFAULT(NOW()))', (err, res) => {
    if (err) {
      console.log(err);
    } else {
      console.log('Created entries table succesfully');
    }
  });
};

const createUserTable = () => {
  client.query('CREATE TABLE IF NOT EXISTS users (user_id SERIAL PRIMARY KEY, email CHARACTER VARYING(30) UNIQUE NOT NULL, username CHARACTER VARYING(30) NOT NULL, password CHARACTER VARYING(250) NOT NULL)', (err, res) => {
    if (err) {
      console.log(err);
    } else {
      console.log('Created users table succesfully');
    }
  });
};

const deleteUserTable = () => {
  client.query('DROP TABLE IF EXISTS users CASCADE', (err, res) => {
    if (err) {
      console.log(err);
    } else {
      console.log('Deleted users table succesfully');
    }
  });
};

const deleteEntryTable = () => {
  client.query('DROP TABLE IF EXISTS entries CASCADE', (err, res) => {
    if (err) {
      console.log(err);
    } else {
      console.log('Deleted entries table succesfully');
    }
  });
};

export {
  createEntryTable,
  createUserTable,
  deleteUserTable,
  deleteEntryTable
};