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

  let portfolio: PortfolioProject[] = [];
  for await (const project of projects) {
    const weight = Number(project.distribution_weight);
    const volume = Number(project.offered_volume_in_tons);
    const distributedVolume = weight * tonnage;

    portfolio.push({...project, volume: distributedVolume});
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

export function summarizePortfolio(projects: PortfolioProject[]) {
  const summary = projects.reduce(
    (acc, project) => {
      const volume = project.volume;
      const price = Number(project.price_per_ton) * volume;
      return {
        price: acc.price + price,
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
