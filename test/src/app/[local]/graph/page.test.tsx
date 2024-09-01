import { render, screen } from '@testing-library/react';
import GraphPage from '../../../../../src/app/[locale]/graph/page';
import { describe, test, expect, vi } from 'vitest';

vi.mock('../../../../../src/app/components/GraphForm.tsx', () => ({
  __esModule: true,
  default: () => <div>Mocked GraphForm</div>,
}));

describe('GraphPage', () => {
  test('renders the page title', () => {
    render(<GraphPage />);
    const titleElement = screen.getByText(/GraphiQL/i);
    expect(titleElement).toBeInTheDocument();
  });
});
