import {expect, test, vi} from 'vitest';
import {render, screen, fireEvent} from '@testing-library/react';
import RootLayout from '@/app/layout';

vi.mock('next/navigation', () => require('next-router-mock'));

vi.mock('next/font/google', () => {
  return {
    Inter: vi.fn().mockReturnValue({
      className: 'inter'
    })
  };
});

test('App Router: Works with Client Components (React State)', () => {
  render(
    <RootLayout>
      <p>Test</p>
    </RootLayout>
  );
  expect(screen.getByRole('heading', {level: 2, name: '0'})).toBeDefined();
  fireEvent.click(screen.getByRole('button'));
  expect(screen.getByRole('heading', {level: 2, name: '1'})).toBeDefined();
});
