import { renderHook } from '@testing-library/react';
import { useDecodedUrl } from '../../../../src/app/utils/useDecodedUrl';
import { describe, it, expect, vi, Mock } from 'vitest';
import { usePathname, useSearchParams } from 'next/navigation';

vi.mock('next/navigation', () => ({
  usePathname: vi.fn(),
  useSearchParams: vi.fn(),
}));

vi.mock('../../../../../src/app/modules/encodeBase64', () => ({
  decodeBase64: vi.fn((str: string) => `decoded-${str}`),
}));

describe('useDecodedUrl', () => {
  it('should return null if pathname is not available', () => {
    (usePathname as Mock).mockReturnValue(null);
    (useSearchParams as Mock).mockReturnValue(new URLSearchParams());

    const { result } = renderHook(() => useDecodedUrl());
    expect(result.current).toBeNull();
  });

  it('should decode the URL parts correctly', () => {
    const mockPathname = 'en/GET/aW5wdXQx/cXVlcnkx';
    const mockSearchParams = new URLSearchParams({
      headers: 'aGVhZGVyczE=',
      variables: 'dmFyaWFibGVzMQ==',
    });

    (usePathname as Mock).mockReturnValue(mockPathname);
    (useSearchParams as Mock).mockReturnValue(mockSearchParams);

    const { result } = renderHook(() => useDecodedUrl());

    expect(result.current).toEqual({
      method: 'GET',
      input: 'input1',
      query: 'query1',
      headers: 'headers1',
      variables: 'variables1',
    });
  });
});
