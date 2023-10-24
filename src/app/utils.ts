import type {Project, PortfolioProject} from '@/types';
import {getProjects} from '@/lib/database';
import {
  getMaximumTonnage as getCachedMaximumTonnage,
  setMaximumTonnage
} from '@/lib/redis';

export async function calculateMaximumTonnage(
  projects: AsyncIterableIterator<Project>,
  tonnage: number
): Promise<PortfolioProject[]> {
  const dp = {
    map: new Map(),
    keys: new Set<number>([0]),
    get(key: number) {
      let current = dp.map.get(key);
      if (!current) {
        current = [0, []];
      }

      return current;
    },
    set(key: number, [total, projects]: [number, Project[]]) {
      dp.map.set(key, [total, projects]);
      dp.keys.add(key);
    }
  };

  for await (const project of projects) {
    const weight = Number(project.distribution_weight);
    const volume = Number(project.offered_volume_in_tons);
    const distributedVolume = weight * tonnage;

    if (distributedVolume < volume) {
      for (const key of [...dp.keys.keys()]) {
        const previousMax = dp.get(key + weight);
        const possibleMax = dp.get(key)[0] + distributedVolume;
        if (previousMax[0] < possibleMax) {
          const previousProjects = dp.get(key)[1];
          dp.set(key + weight, [
            dp.get(key)[0] + distributedVolume,
            previousProjects.concat({...project, volume: distributedVolume})
          ]);
        }
      }
    }
  }

  return dp.get(1)[1];
}

export async function getMaximumTonnage(tonnage: number) {
  let cached = await getCachedMaximumTonnage(tonnage);
  if (!cached) {
    const projectIterator = await getProjects();
    const maxProject = await projectIterator.next();
    const {offered_volume_in_tons} = maxProject.value;

    const maxTonnage = Number(offered_volume_in_tons);
    if (maxTonnage > tonnage) {
      cached = [{...maxProject.value, volume: tonnage}];
    } else {
      cached = await calculateMaximumTonnage(projectIterator, tonnage);
    }
    setMaximumTonnage(tonnage, cached);
  }
  return cached;
}

export function summarizePortfolio(projects: PortfolioProject[]) {
  const summary = projects.reduce(
    (acc, project) => {
      const volume = project.volume;
      const price = Number(project.price_per_ton) * volume;
      return {
        price: acc.price + volume * price,
        tonnage: acc.tonnage + volume
      };
    },
    {price: 0, tonnage: 0}
  );
  return summary;
}

export async function getRecommendedPortfolio(maxTons: number) {
  const projects = await getMaximumTonnage(maxTons);
  const {price, tonnage} = summarizePortfolio(projects);

  return {
    projects,
    price,
    tonnage
  };
}
