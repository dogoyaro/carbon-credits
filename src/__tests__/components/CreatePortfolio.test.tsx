import {expect, test, vi} from 'vitest';
import {render, screen, fireEvent} from '@testing-library/react';
import {CreatePortfolioButton} from '@/components/CreatePortfolio';

vi.mock('next/navigation', () => require('next-router-mock'));

vi.mock('next/font/google', () => {
  return {
    Inter: vi.fn().mockReturnValue({
      className: 'inter'
    })
  };
});

test('Create Portfolio:  allow user to create portfolio for valid tonnage', () => {
  render(<CreatePortfolioButton />);
  const button = screen.getByRole('button');
  expect(button).toBeDefined();
  expect(button.getAttribute('class')).toContain('cursor-not-allowed');

  const input = screen.getByRole('textbox');
  fireEvent.change(input, {target: {value: '2000'}});
  expect(button.getAttribute('class')).not.toContain('cursor-not-allowed');
  fireEvent.click(screen.getByRole('button'));
});
