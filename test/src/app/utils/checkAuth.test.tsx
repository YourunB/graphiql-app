import { vi, describe, afterEach, beforeEach, test } from 'vitest';
import { useRouter } from 'next/navigation';
import { useAuthState } from 'react-firebase-hooks/auth';
import checkAuth from '../../../../src/app/utils/checkAuth';
import { renderHook, act } from '@testing-library/react';

vi.mock('next/navigation', () => ({
  useRouter: vi.fn(),
}));

vi.mock('react-firebase-hooks/auth', () => ({
  useAuthState: vi.fn(),
}));

describe('checkAuth', () => {
  const mockPush = vi.fn();

  beforeEach(() => {
    vi.mock('../../../../src/firebase.ts', () => ({
      auth: {
        signInWithEmailAndPassword: vi.fn(),
        createUserWithEmailAndPassword: vi.fn(),
        signOut: vi.fn(),
      },
      firestore: {
        collection: vi.fn().mockReturnThis(),
        doc: vi.fn().mockReturnThis(),
        set: vi.fn(),
        get: vi.fn(),
        update: vi.fn(),
        delete: vi.fn(),
      },
    }));

    useRouter.mockReturnValue({ push: mockPush });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  test('should redirect to "/" if user is not authenticated', async () => {
    useAuthState.mockReturnValue([null, false]);

    await act(async () => {
      renderHook(() => checkAuth());
    });

    expect(mockPush).toHaveBeenCalledWith('/');
  });

  test('should not redirect if user is authenticated', async () => {
    useAuthState.mockReturnValue([{ uid: '123' }, false]);

    await act(async () => {
      renderHook(() => checkAuth());
    });

    expect(mockPush).not.toHaveBeenCalled();
  });

  test('should not redirect if loading', async () => {
    useAuthState.mockReturnValue([null, true]);

    await act(async () => {
      renderHook(() => checkAuth());
    });

    expect(mockPush).not.toHaveBeenCalled();
  });
});
