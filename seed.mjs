import {MongoClient} from 'mongodb';
import axios from 'axios';
import csv from 'csv-parser';

const mongo_client_url = process.env.MONGO_CLIENT_URL;

if (!mongo_client_url) {
  throw new Error('MONGO_CLIENT_URL is not set');
}

async function getCSVData() {
  const sampleDataUrl =
    'https://ceezer-public-assets.s3.eu-central-1.amazonaws.com/tech/fullstack-code-challenge/projects_sample.csv';

  const response = await axios.get(sampleDataUrl, {responseType: 'stream'});

  if (response.status !== 200) {
    throw new Error('Failed to fetch sample data');
  }

  const results = [];
  const parser = csv();

  return await new Promise((resolve) => {
    parser.on('data', (row) => {
      results.push(row);
    });
    parser.on('end', () => {
      resolve(results);
    });

    response.data.pipe(parser);
  });
}

async function seed() {
  const client = new MongoClient(mongo_client_url, {
    useNewUrlParser: true
  });

  try {
    await client.connect();
    const collection = client.db('carbon-credits').collection('projects');
    collection.drop();

    // get sample data
    const sampleData = await getCSVData();
    const results = await collection.insertMany(sampleData);
    console.log(
      '`projects` collection seeded with %d documents',
      results.insertedCount
    );
  } catch (err) {
    console.error('Error seeding database', err);
  } finally {
    client.close();
  }
}

seed();
