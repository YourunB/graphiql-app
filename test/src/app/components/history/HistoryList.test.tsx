import HistoryList from '../../../../../src/app/components/history/HistoryList';
import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

vi.mock('../../../../../src/app/modules/encodeBase64', () => ({
  encodeBase64: vi.fn((str: string) => Buffer.from(str).toString('base64')),
}));

vi.mock('HistoryList', () => ({
  ...vi.importActual('../../../../../src/app/components/history/HistoryList'),
  createURL: vi.fn(() => 'http://localhost:3000/GET/aW5wdXQx/cXVlcnkx?headers=aGVhZGVyczE%3D&variables=dmFyaWFibGVzMQ%3D%3D'),
}));

describe('HistoryList', () => {
  const mockData = [
    {
      method: 'GET',
      input: 'input1',
      query: 'query1',
      headers: 'headers1',
      variables: 'variables1'
    },
  ];

  it('renders the list of history items', () => {
    render(<HistoryList data={mockData} />);

    expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument();
    expect(screen.getByText('history.full')).toBeInTheDocument();

    expect(screen.getByText('GET input1')).toBeInTheDocument();

    const links = screen.getAllByRole('link');
    expect(links[0]).toHaveAttribute('href', 'http://localhost:3000/GET/aW5wdXQx/cXVlcnkx?headers=aGVhZGVyczE%3D&variables=dmFyaWFibGVzMQ%3D%3D');
  });
});