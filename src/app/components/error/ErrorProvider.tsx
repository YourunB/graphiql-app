import { useState, createContext, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

interface ErrorContextType {
  error: string | null;
  showError: (message?: string) => void;
  clearError: () => void;
}

const defaultContext: ErrorContextType = {
  error: null,
  showError: () => {},
  clearError: () => {},
};

export const ErrorContext = createContext(defaultContext);

interface ErrorProviderProps {
  children: ReactNode;
}

export const ErrorProvider: React.FC<ErrorProviderProps> = ({ children }) => {
  const { t } = useTranslation();

  const [error, setError] = useState<string | null>(null);

  const transformError = (message?: string) => {
    if (message?.includes('invalid-credential')) setError(t('errors.invalid'));
    if (message?.includes('email-already-in-use')) setError(t('errors.userExist'));
    if (message?.includes('network-request-failed')) setError(t('errors.network'));
    if (message) setError(message);
  };

  const showError = (message?: string) => {
    transformError(message);
    setTimeout(() => setError(null), 5000);
  };

  const clearError = () => {
    setError(null);
  };

  return <ErrorContext.Provider value={{ error, showError, clearError }}>{children}</ErrorContext.Provider>;
};
