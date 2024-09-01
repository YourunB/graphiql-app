import { describe, it, vi, expect } from 'vitest';
import { useContext } from 'react';
import { useError } from '../../../../src/app/hooks/useError';

vi.mock('react', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useContext: vi.fn(),
    createContext: actual.createContext,
  };
});

describe('useError', () => {
  it('должен возвращать контекст ошибки', () => {
    const mockContext = { error: 'Test error' };
    useContext.mockReturnValue(mockContext);

    const result = useError();
    expect(result).toBe(mockContext);
  });

  it('должен возвращать undefined, если контекст не задан', () => {
    useContext.mockReturnValue(undefined);

    const result = useError();
    expect(result).toBeUndefined();
  });
});
