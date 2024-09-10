import { render, screen } from '@testing-library/react';
import PageNotFound from '../../../../../src/app/[locale]/404/page';
import { describe, it, expect } from 'vitest';

vi.mock('next/image', () => ({
  __esModule: true,
  default: (props) => <img {...props} />,
}));

vi.mock('next/link', () => ({
  __esModule: true,
  default: ({ children, href }) => <a href={href}>{children}</a>,
}));

describe('PageNotFound', () => {
  it('render title', () => {
    render(<PageNotFound />);
    const titleElement = screen.getByText(/404/i);
    expect(titleElement).toBeInTheDocument();
  });

  it('render home link', () => {
    render(<PageNotFound />);
    const linkElement = screen.getByRole('link', { name: /home/i });
    expect(linkElement).toHaveAttribute('href', '/');
  });

  it('render icon', () => {
    render(<PageNotFound />);
    const imgElement = screen.getByAltText(/home/i);
    expect(imgElement).toBeInTheDocument();
    expect(imgElement).toHaveAttribute('src', expect.stringContaining('home.svg'));
  });
});