import type {Project} from '@/types';
import {getProjects} from '@/lib/database';
import {
  getMaximumTonnage as getCachedMaximumTonnage,
  setMaximumTonnage
} from '@/lib/redis';

export async function calculateMaximumTonnage(
  projects: AsyncIterableIterator<Project>,
  tonnage: number
): Promise<Project[]> {
  const dp = {
    map: new Map(),
    keys: [] as number[],
    get(key: number) {
      let current = dp.map.get(key);
      if (!current) {
        current = [0, []];
      }

      return current;
    },
    set(key: number, [total, project]: [number, Project]) {
      const [_, currentProjects] = dp.get(key);
      dp.map.set(key, [total, [...currentProjects, project]]);
      dp.keys.push(key);
    }
  };

  let portfolio: Project[] = [];
  for await (const project of projects) {
    const weight = Number(project.distribution_weight);
    const volume = Number(project.offered_volume_in_tons);
    const distributedVolume = weight * tonnage;

    portfolio.push(project);
  }

  return portfolio;
}

export async function getMaximumTonnage(tonnage: number) {
  let cached = await getCachedMaximumTonnage(tonnage);
  if (!cached) {
    const projectIterator = await getProjects();
    cached = await calculateMaximumTonnage(projectIterator, tonnage);
    setMaximumTonnage(tonnage, cached);
  }
  return cached;
}
