// import { render, screen } from '@testing-library/react';
import { metadata } from '@/app/layout';
import { test, describe, expect } from 'vitest';
import '@testing-library/jest-dom';

describe('RootLayout', () => {
  test('has correct metadata', () => {
    expect(metadata.title).toBe('GraphiQL App');
    expect(metadata.description).toBe('GraphiQL App student project');
  });
});
