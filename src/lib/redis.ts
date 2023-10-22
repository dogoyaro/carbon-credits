import {createClient} from 'redis';
import type {Project} from '../types';

let client: ReturnType<typeof createClient>;

export async function getClient() {
  if (!client) {
    client = await createClient({
      url: 'redis://localhost:6379'
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
