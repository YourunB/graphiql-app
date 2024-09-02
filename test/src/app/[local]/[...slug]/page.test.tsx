import { render } from '@testing-library/react';
import { describe, test, expect, vi } from 'vitest';
import RestPage from '../../../../../src/app/[locale]/[...slug]/page';

vi.mock('../../../../../src/app/components/RestForm.tsx', () => ({
  __esModule: true,
  default: () => <div>Mocked RestForm</div>,
}));

describe('RestPage', () => {
  test('renders correctly', () => {
    const { getByText } = render(<RestPage />);
    expect(getByText('Restfull')).toBeInTheDocument();
    expect(getByText('Mocked RestForm')).toBeInTheDocument();
  });
});
