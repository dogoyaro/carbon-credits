import {MongoClient, FindCursor} from 'mongodb';

if (!process.env.MONGO_CLIENT_URL) {
  throw new Error('Please provide a valid MONGO_CLIENT_URL');
}

const url = process.env.MONGO_CLIENT_URL;

let connected = false;
let client: MongoClient;

export async function dbClient(): Promise<MongoClient> {
  if (client && connected) {
    return client;
  }

  try {
    client = new MongoClient(url, {});

    await client.connect();
  } catch (err) {
    console.log(err);
  }

  return client;
}

enum SortOrder {
  ASC = 1,
  DESC = -1
}

export async function getProjects(): Promise<FindCursor<any>> {
  const databaseClient = await dbClient();

  const db = databaseClient.db('carbon-credits');

  const sort = {
    distribution_weight: SortOrder.DESC
  };
  return db.collection('projects').find().sort(sort);
}
