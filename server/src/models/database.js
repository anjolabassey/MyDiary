import pg from 'pg';

// process.env.DATABASE_URL ||
require('dotenv').config();

// const connectionString = process.env.CONSTRING;

const client = new pg.Client(process.env.CONSTRING);

const db = () => {
  client.connect((err) => {
    if (err) {
      console.error('connection error', err);
    } else {
      console.log('Connected to the database');
    }
  });
  return client;
};

export { db, client };