import type {Project} from '@/types';
import {getProjects} from '@/lib/database';

export interface Portfolio {
  projects: Project[];
  price: number;
  tonnage: number;
}

function summarizePortfolio(projects: Project[]) {
  const summary = projects.reduce(
    (acc, project) => {
      const price = Number(project.price_per_ton);
      const tonnage = Number(project.offered_volume_in_tons);
      return {
        price: acc.price + price,
        tonnage: acc.tonnage + tonnage
      };
    },
    {price: 0, tonnage: 0}
  );
  return summary;
}

export async function getPortfolio(maxTons: number) {
  const projectIterator = await getProjects();
  const projects = await getMaximumTonnage(projectIterator, maxTons);

  const {price, tonnage} = summarizePortfolio(projects);

  // console.log('the projects', projects);
  return {
    projects,
    price,
    tonnage
  };
}

async function getMaximumTonnage(
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
