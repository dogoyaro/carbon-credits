import type {Project} from '@/types';

export interface Portfolio {
  projects: Project[];
  price: number;
  tonnage: number;
}
export async function getPortfolio(tonnage: number) {
  return {
    projects: [],
    price: 0,
    tonnage: 0
  };
}
