import { describe, test, expect } from 'vitest';
import { encodeBase64 } from '../../../../src/app/modules/encodeBase64';

describe('encodeBase64', () => {
  test('should encode a string to Base64', () => {
    const input = 'Hello, World!';
    const expectedOutput = 'SGVsbG8sIFdvcmxkIQ==';
    expect(encodeBase64(input)).toBe(expectedOutput);
  });

  test('handle empty string', () => {
    const input = '';
    const expectedOutput = '';
    expect(encodeBase64(input)).toBe(expectedOutput);
  });

  test('handle special characters', () => {
    const input = 'Привет, мир!';
    const expectedOutput = '0J/RgNC40LLQtdGCLCDQvNC40YAh';
    expect(encodeBase64(input)).toBe(expectedOutput);
  });
});
