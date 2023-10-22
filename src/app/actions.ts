import type {Project} from '@/types';
import {getProjects} from '@/lib/database';
import {getMaximumTonnage} from './utils';

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
  const projects = await getMaximumTonnage(maxTons);
  const {price, tonnage} = summarizePortfolio(projects);

  // console.log('the projects', projects);
  return {
    projects,
    price,
    tonnage
  };
}

export async function getAllProjects() {
  // todo: add support for pagination, sorting, and filtering
  const projects = (await getProjects()).toArray();
  return projects;
}
