import { Client } from 'pg';

const connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/mydiary';

const client = new Client({ connectionString });

const startDb = () => {
  client.connect();
  return client;
};

const query = client.query(
  'CREATE TABLE entries(id SERIAL PRIMARY KEY, title VARCHAR(40) not null, body VARCHAR())');
query.on('end', () => { client.end(); });

export default startDb;