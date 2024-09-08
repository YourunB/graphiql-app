import RegisterForm from '../../../../../src/app/components/forms/RegisterForm';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { describe, expect, vi, it, beforeEach, Mock } from 'vitest';

vi.mock('react-firebase-hooks/auth', () => ({
  useAuthState: vi.fn(),
}));

vi.mock('../../../../../src/firebase', () => ({
  registerWithEmailAndPassword: vi.fn(),
  auth: {},
}));

vi.mock('../../../../../src/app/hooks/useError', () => ({
  useError: () => ({
    showError: vi.fn(),
    error: null,
    clearErrors: vi.fn(),
  }),
}));

vi.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key }),
}));

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
  }),
}));

describe('RegisterForm', () => {
  beforeEach(() => {
    (useAuthState as Mock).mockReturnValue([null, false]);
  });

  it('renders the registration form', () => {
    render(<RegisterForm />);

    expect(screen.getByLabelText('fields.name.name:')).toBeInTheDocument();
    expect(screen.getByLabelText('fields.email.name:')).toBeInTheDocument();
    expect(screen.getByLabelText('fields.password.name:')).toBeInTheDocument();
    expect(screen.getByLabelText('fields.confirmPassword.name:')).toBeInTheDocument();
    expect(screen.getByText('register')).toBeInTheDocument();
  });

  it('validates the form and shows errors', async () => {
    render(<RegisterForm />);

    const submitButton = screen.getByText('register');
    expect(submitButton).toBeDisabled();

    fireEvent.change(screen.getByLabelText('fields.email.name:'), { target: { value: 'invalid-email' } });
    fireEvent.change(screen.getByLabelText('fields.password.name:'), { target: { value: 'short' } });
    fireEvent.change(screen.getByLabelText('fields.confirmPassword.name:'), { target: { value: 'mismatch' } });

    expect(submitButton).toBeDisabled();

    await waitFor(() => {
      expect(screen.getByText('validation.invalidEmail')).toBeInTheDocument();
      expect(screen.getByText('validation.passwordComplexity')).toBeInTheDocument();
      expect(screen.getByText('validation.passwordsMustMatch')).toBeInTheDocument();
    });
  });
});
