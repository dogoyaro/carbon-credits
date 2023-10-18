import type {Project} from '@/types';
import {getProjects} from '@/lib/database';

export interface Portfolio {
  projects: Project[];
  price: number;
  tonnage: number;
}

export async function getPortfolio(tonnage: number) {
  const projectIterator = await getProjects();
  const projects = await getMaximumTonnage(projectIterator, tonnage);

  // logging the projects
  console.log('the projects', projects);
  return {
    projects: [],
    price: 0,
    tonnage: 0
  };
}

async function getMaximumTonnage(
  projects: AsyncIterableIterator<Project>,
  tonnage: number
): Promise<Project[]> {
  const dp = new Map();

  for await (const project of projects) {
    const distributionWeight = Number(project.distribution_weight);
    const volume = Number(project.offered_volume_in_tons);
    const offeredVolume = volume * distributionWeight;

    if (offeredVolume >= tonnage) {
      return [project];
    }

    const currentMaxPerProject = dp.keys();
    const distributedVolume = distributionWeight * tonnage;

    for (const weight of currentMaxPerProject) {
      const currentMaximum = dp.get(weight);

      const previousPotentialMaximum = dp.get(weight - distributionWeight);
      if (previousPotentialMaximum) {
        const potentialMaximum = previousPotentialMaximum + distributedVolume;
        if (potentialMaximum > currentMaximum) {
          dp.set(weight, potentialMaximum);
        }
      } else {
        dp.set(distributionWeight, distributedVolume);
      }
    }
  }

  return [];
}
