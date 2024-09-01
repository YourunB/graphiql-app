import { render, screen, fireEvent } from '@testing-library/react';
import Header from '../../../../src/app/components/Header';
import { expect, describe, test, vi, beforeEach } from 'vitest';
import { useRouter } from 'next/navigation';
import { useAuthState } from 'react-firebase-hooks/auth';

describe('Header component', () => {
  beforeEach(() => {
    vi.mock('../../../../src/firebase.ts', () => ({
      auth: {
        onAuthStateChanged: vi.fn(),
        signInWithEmailAndPassword: vi.fn(),
        signOut: vi.fn(),
      },
      firestore: {
        collection: vi.fn().mockReturnThis(),
        doc: vi.fn().mockReturnThis(),
        set: vi.fn(),
        get: vi.fn(),
      },
    }));
  });

  vi.mock('../../../../src/i18n.ts', () => ({
    default: {
      init: vi.fn(),
    },
  }));

  vi.mock('react-i18next', () => ({
    useTranslation: () => ({
      t: (key) => key,
    }),
  }));

  vi.mock('next/navigation', () => ({
    useRouter: vi.fn(),
  }));

  vi.mock('react-firebase-hooks/auth', () => ({
    useAuthState: vi.fn(),
  }));

  const mockRouter = {
    push: vi.fn(),
  };

  beforeEach(() => {
    useRouter.mockReturnValue(mockRouter);
    useAuthState.mockReturnValue([null]);
  });

  test('renders home link', () => {
    render(<Header />);
    expect(screen.getByText('home')).toBeInTheDocument();
  });

  test('render user links when user logged in', () => {
    useAuthState.mockReturnValue([{ email: 'test@example.com' }]);
    render(<Header />);
    expect(screen.getByText('Graph')).toBeInTheDocument();
    expect(screen.getByText('Rest')).toBeInTheDocument();
  });

  test('render user email when user logged in', () => {
    useAuthState.mockReturnValue([{ email: 'test@example.com' }]);
    render(<Header />);
    expect(screen.getByText('test@example.com')).toBeInTheDocument();
  });

  test('call onLogout when logout button clicked', () => {
    useAuthState.mockReturnValue([{ email: 'test@example.com' }]);
    render(<Header />);
    fireEvent.click(screen.getByText('logout'));
  });

  test('change color on scroll', () => {
    render(<Header />);
    fireEvent.scroll(window, { target: { scrollY: 100 } });
  });

  test('restore color when scroll to top', () => {
    render(<Header />);
    fireEvent.scroll(window, { target: { scrollY: 0 } });
    expect(document.querySelector('header').style.background).toBe('transparent');
  });

  test('render logo', () => {
    render(<Header />);
    expect(screen.getByAltText('GraphQL logo')).toBeInTheDocument();
  });
});
