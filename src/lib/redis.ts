import {createClient} from 'redis';
import type {Project} from '../types';

let client: ReturnType<typeof createClient>;

if (!process.env.REDIS_CLIENT_URL) {
  throw new Error('Please specify a valid REDIS_CLIENT_URL');
}

export async function getClient() {
  if (!client) {
    client = await createClient({
      url: process.env.REDIS_CLIENT_URL
    }).connect();
  }

  return client;
}

export async function getMaximumTonnage(tonnage: number) {
  try {
    const client = await getClient();
    const cachedResponse = await client.get(tonnage.toString());
    if (cachedResponse) {
      return JSON.parse(cachedResponse);
    }
    return cachedResponse;
  } catch (error) {
    console.log('Error getting redis client: ', error);
  }
}

export async function setMaximumTonnage(tonnage: number, projects: Project[]) {
  try {
    const client = await getClient();
    return await client.set(tonnage.toString(), JSON.stringify(projects));
  } catch (error) {
    console.log('Error getting redis client: ', error);
  }
}
