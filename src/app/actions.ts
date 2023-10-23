import type {Project} from '@/types';
import {getProjects} from '@/lib/database';
import {getRecommendedPortfolio} from './utils';

export interface Portfolio {
  projects: Project[];
  price: number;
  tonnage: number;
}

export async function getPortfolio(
  maxTons: number
): Promise<{projects: Project[]; price: number; tonnage: number}> {
  return getRecommendedPortfolio(maxTons);
}

export async function getAllProjects() {
  // todo: add support for pagination, sorting, and filtering
  const projects = (await getProjects()).toArray();
  return projects;
}
