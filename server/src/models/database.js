import { Client } from 'pg';

const connectionString = process.env.DATABASE_URL || 'postgres://postgres:anjola@localhost:5432/mydiary';

const client = new Client({ connectionString });

const startDb = () => {
  client.connect();
  return client;
};

export default startDb;