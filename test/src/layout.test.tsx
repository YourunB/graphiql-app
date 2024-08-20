import { render, screen } from '@testing-library/react';
import RootLayout, { metadata } from '../../src/app/layout';
import { test, describe, expect } from 'vitest';
import '@testing-library/jest-dom';

describe('RootLayout', () => {
  test('renders the Header component', () => {
    render(<RootLayout><div /></RootLayout>);
    expect(screen.getByText('Header...')).toBeInTheDocument();
    expect(screen.getByText('Footer...')).toBeInTheDocument();
  });

  test('renders children components', () => {
    render(<RootLayout><div data-testid="child" /></RootLayout>);
    expect(screen.getByTestId('child')).toBeInTheDocument();
  });

  test('has correct metadata', () => {
    expect(metadata.title).toBe('GraphiQL App');
    expect(metadata.description).toBe('GraphiQL App student project');
  });
});