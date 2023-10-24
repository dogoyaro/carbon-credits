import type {Project} from '@/types';
import {calculateMaximumTonnage, summarizePortfolio} from '@/app/utils';
import {vi, test, expect} from 'vitest';

vi.mock('mongodb');

async function* projects(projects: Project[]) {
  for (let i = 0; i < projects.length; i++) {
    yield projects[i];
  }
}

const projectList = [
  {
    id: '5',
    name: 'EverGreen Carbon',
    country: 'Egipt',
    image:
      'https://ceezer-public-assets.s3.eu-central-1.amazonaws.com/project_type_sample_images/Renewable+energy/andreas-gucklhorn-Ilpf2eUPpUE-unsplash-min.jpg',
    price_per_ton: '10.5',
    offered_volume_in_tons: '16000',
    distribution_weight: '0.55',
    supplier_name: 'Carbon Solutions',
    earliest_delivery: '2023-12-01',
    description:
      'The "EverGreen Carbon" project is a transformative carbon credit initiative aimed at restoring and maintaining vital forest ecosystems.\n' +
      "Through reforestation, afforestation, and sustainable forest management, we will sequester significant carbon dioxide, enhance biodiversity, empower local communities, and combat deforestation. Verified carbon credits will be generated, reflecting the project's positive impact on the environment. Join us in creating a sustainable and greener future with EverGreen Carbon."
  },
  {
    id: '5',
    name: 'EverGreen Carbon',
    country: 'Egipt',
    image:
      'https://ceezer-public-assets.s3.eu-central-1.amazonaws.com/project_type_sample_images/Renewable+energy/andreas-gucklhorn-Ilpf2eUPpUE-unsplash-min.jpg',
    price_per_ton: '10.5',
    offered_volume_in_tons: '16000',
    distribution_weight: '0.45',
    supplier_name: 'Carbon Solutions',
    earliest_delivery: '2023-12-01',
    description:
      'The "EverGreen Carbon" project is a transformative carbon credit initiative aimed at restoring and maintaining vital forest ecosystems.\n' +
      "Through reforestation, afforestation, and sustainable forest management, we will sequester significant carbon dioxide, enhance biodiversity, empower local communities, and combat deforestation. Verified carbon credits will be generated, reflecting the project's positive impact on the environment. Join us in creating a sustainable and greener future with EverGreen Carbon."
  },
  {
    id: '5',
    name: 'EverGreen Carbon',
    country: 'Egipt',
    image:
      'https://ceezer-public-assets.s3.eu-central-1.amazonaws.com/project_type_sample_images/Renewable+energy/andreas-gucklhorn-Ilpf2eUPpUE-unsplash-min.jpg',
    price_per_ton: '10.5',
    offered_volume_in_tons: '16000',
    distribution_weight: '0.05',
    supplier_name: 'Carbon Solutions',
    earliest_delivery: '2023-12-01',
    description:
      'The "EverGreen Carbon" project is a transformative carbon credit initiative aimed at restoring and maintaining vital forest ecosystems.\n' +
      "Through reforestation, afforestation, and sustainable forest management, we will sequester significant carbon dioxide, enhance biodiversity, empower local communities, and combat deforestation. Verified carbon credits will be generated, reflecting the project's positive impact on the environment. Join us in creating a sustainable and greener future with EverGreen Carbon."
  }
];

test('calculates the maximum tonnage given projects and a maximum number of tons', async () => {
  const portfolio = await calculateMaximumTonnage(projects(projectList), 100);
  const {tonnage} = summarizePortfolio(portfolio);
  expect(tonnage).toBe(100);
});

test('recommends projects in the portfolio proportional to the distribution weight', async () => {
  const portfolio = await calculateMaximumTonnage(projects(projectList), 100);
  const {tonnage} = summarizePortfolio(portfolio);
  portfolio.forEach((project) => {
    const {distribution_weight, volume} = project;
    expect(Number(distribution_weight) * tonnage).toBe(volume);
  });
  expect(tonnage).toBeLessThanOrEqual(100);
});
