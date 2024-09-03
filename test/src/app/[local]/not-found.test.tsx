import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import PageNotFound from '../../../../src/app/[locale]/not-found';
import { vi, test, expect, describe } from 'vitest';

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key) => key,
  }),
}));

describe('PageNotFound', () => {
  test('render 404 title', () => {
    render(<PageNotFound />);
    const titleElement = screen.getByText('404');
    expect(titleElement).toBeInTheDocument();
  });

  test('render not found description', () => {
    render(<PageNotFound />);
    const descriptionElement = screen.getByText('notFoundPage');
    expect(descriptionElement).toBeInTheDocument();
  });

  test('render home link', () => {
    render(<PageNotFound />);
    const linkElement = screen.getByText('home');
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute('href', '/');
  });
});
