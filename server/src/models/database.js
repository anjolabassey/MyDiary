import pg from 'pg';

// process.env.DATABASE_URL ||
require('dotenv').config();

const connectionString = process.env.DATABASE_URL;

const client = new pg.Client(connectionString);

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