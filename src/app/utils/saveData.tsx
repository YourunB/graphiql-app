import { User } from 'firebase/auth';

export type RestData = {
  input?: string;
  query: string;
  variables: string;
  headers: string;
  method: string;
};

export const saveDataFromRest = (dataToSave: RestData, user: User['email']) => {
  const storageKey = `${user}-data`;
  const existingData = localStorage.getItem(storageKey);
  const data = existingData ? JSON.parse(existingData) : [];
  data.push(dataToSave);
  localStorage.setItem(storageKey, JSON.stringify(data));
};

export const getDataFromLS = (user?: User['email']): RestData[] => {
  const storageKey = `${user}-data`;
  const existingData = localStorage.getItem(storageKey);
  const data = existingData ? JSON.parse(existingData) : [];
  return data;
};
