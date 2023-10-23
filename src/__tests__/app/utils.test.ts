import type {Project} from '@/types';
import {calculateMaximumTonnage, summarizePortfolio} from '@/app/utils';
import {test, expect} from 'vitest';

async function* projects(projects: Project[]) {
  for (let i = 0; i < projects.length; i++) {
    yield projects[i];
  }
}

test('calculates the maximum tonnage given projects and a maximum number of tons', async () => {
  const portfolio = await calculateMaximumTonnage(projects([]), 100);
  const {tonnage} = summarizePortfolio(portfolio);
  expect(tonnage).toBe(100);
});

test('returns the tonnage from a single project when it offers the full volume', async () => {
  const portfolio = await calculateMaximumTonnage(projects([]), 100);
  const {tonnage} = summarizePortfolio(portfolio);
  expect(tonnage).toBe(100);
  expect(portfolio.length).toBe(1);
});

test('recommends projects in the portfolio proportional to the distribution weight', async () => {
  const portfolio = await calculateMaximumTonnage(projects([]), 100);
  const {tonnage} = summarizePortfolio(portfolio);
  portfolio.forEach((project) => {
    const {distribution_weight, volume} = project;
    expect(distribution_weight * tonnage).toBe(volume);
  });
  expect(tonnage).toBeLessThanOrEqual(100);
});
