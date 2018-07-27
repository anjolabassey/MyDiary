import pg from 'pg';

// process.env.DATABASE_URL ||
const connectionString = 'postgres://postgres:anjola@localhost:5432/mydiary';

const client = new pg.Client(connectionString);

const db = () => {
  client.connect((err) => {
    if (err) {
      console.error('connection error', err.stack);
    } else {
      console.log('Connected to the database');
    }
  });
  return client;
};


export {
  db,
  client
};