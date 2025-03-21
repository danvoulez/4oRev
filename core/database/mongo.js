import { MongoClient } from 'mongodb';

const client = new MongoClient(process.env.MONGODB_URI);
export const db = client.db("agentos");

export async function connect() {
  if (!client.isConnected()) await client.connect();
  return db;
}
