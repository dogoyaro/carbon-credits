import type {Project} from '@/types';

export async function getMaximumTonnage(
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
